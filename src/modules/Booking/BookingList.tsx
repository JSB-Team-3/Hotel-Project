import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../shared/DataTable/DataTable';
import { Room } from '../../Interfaces/rooms.interface';
import { StyledTableCell, StyledTableRow } from '../shared/StyledTable/StyledTable';
import TableActions from '../shared/TableActions/TableActions';
import Header from '../shared/Header/Header';
import { deleteBooking, getAllBookings } from '../store/booking/bookingsThunk';
import { Booking } from '../../Interfaces/bookings.interfaces';
import { User } from '../../Interfaces/user.interface';
export default function BookingList() {
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);  
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, bookings, deleteLoading,totalCount } = useSelector((state: RootState) => ({
    loading: state.bookings.loading,
    bookings: state.bookings.bookings,
    deleteLoading: state.bookings.deleteLoading,
    totalCount: state.bookings.totalCount,
  }),
  shallowEqual);
  console.log('heeeeeeey',bookings);

  const getAllBookingsList = async () => {
    try {
     await dispatch(getAllBookings({ 
             page: page + 1,
             size: size 
           })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to get all Booking', { variant: 'error' });
    }
  };

  const handleDeleteItem = (itemId: string, itemNumber: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteNumber(itemNumber);
    setShowDeleteModal(true);
  };

  const ConfirmDelete = async () => {
    try {
      const response = await dispatch(deleteBooking(itemToDeleteId)).unwrap();
      setShowDeleteModal(false);
      getAllBookingsList();
      setItemToDeleteId('');
      setItemToDeleteNumber('');
      enqueueSnackbar(response?.message || 'Booking deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to delete booking', { variant: 'error' });
    }
  };
  const renderRow = (item: Room | Booking | User) => {
    if ('startDate' in item && 'endDate' in item && 'totalPrice' in item && 'user' in item) {
      const booking = item as Booking;
      return (
        <StyledTableRow key={booking._id}>
          <StyledTableCell component="th" scope="row">
            {booking.room?.roomNumber || "No room assigned"}
          </StyledTableCell>
          <StyledTableCell>
            {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "-"}
          </StyledTableCell>
          <StyledTableCell>
            {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "-"}
          </StyledTableCell>
          <StyledTableCell>{booking.totalPrice}</StyledTableCell>
          <StyledTableCell>{booking.user?.userName || "Unknown"}</StyledTableCell>
          <StyledTableCell>{booking.status}</StyledTableCell>
          <StyledTableCell>
            <TableActions handleDeleteItem={handleDeleteItem} item={booking} route={''} />
          </StyledTableCell>
        </StyledTableRow>
      );
    }
    return null;
  }
  // Pagination handlers
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllBookingsList();
  }, [page, size]); 
  return (
    <Box>
      <Header title='Booking' route='' />
     <DataTable
     loading={loading}
     items={bookings}
      page={page}
      size={size}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      labelRowsPerPage="booking per Page:"
      columns={['Room Number', 'Start Date', 'End Date', 'Total Price', 'User Name', 'status', '']} 
      renderRow = {renderRow}


     />
        <DeleteConfirmation
          open={showDeleteModal}
          handleClose={() => { setShowDeleteModal(false) }}
          confirm={ConfirmDelete}
          message={`Delete This Booking ${itemToDeleteNumber}`}
          loading={deleteLoading}
        />
    </Box>
  );
}
