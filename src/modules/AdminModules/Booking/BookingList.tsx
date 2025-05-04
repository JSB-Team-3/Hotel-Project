import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import DeleteConfirmation from '../../../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../../../shared/DataTable/DataTable';
import { Room } from '../../../Interfaces/rooms.interface';
import { StyledTableCell, StyledTableRow } from '../../../shared/StyledTable/StyledTable';
import TableActions from '../../../shared/TableActions/TableActions';
import Header from '../../../shared/Header/Header';
import { deleteBooking, getAllBookings, } from '../../../store/booking/bookingsThunk';
import { Booking } from '../../../Interfaces/bookings.interfaces';
import { User } from '../../../Interfaces/user.interface';
import { RoomFacility } from '../../../Interfaces/facilities.interface';
import { useTranslation } from 'react-i18next';

export default function BookingList() {
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, bookings, deleteLoading, totalCount } = useSelector(
    (state: RootState) => ({
      loading: state.bookings.loading,
      bookings: state.bookings.bookings,
      deleteLoading: state.bookings.deleteLoading,
      totalCount: state.bookings.totalCount,
    }),
    shallowEqual
  );

  const getAllBookingsList = useCallback(async () => {
    console.log('get');

    try {
      await dispatch(getAllBookings({
        page: page + 1,
        size,
      })).unwrap();
    } catch (err) {
      enqueueSnackbar((err as string) || t('bookings.failedToGet'), { variant: 'error' });
    }
  }, [dispatch, page, size, enqueueSnackbar, t]);

  useEffect(() => {
    getAllBookingsList();
  }, [getAllBookingsList]);

  const handleDeleteItem = useCallback((itemId: string, itemNumber: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteNumber(itemNumber);
    setShowDeleteModal(true);
  }, []);

  const ConfirmDelete = useCallback(async () => {
    try {
      const response = await dispatch(deleteBooking(itemToDeleteId)).unwrap();
      enqueueSnackbar(response?.message || t('bookings.deletedSuccess'), { variant: 'success' });
      setShowDeleteModal(false);
      setItemToDeleteId('');
      setItemToDeleteNumber('');
      getAllBookingsList();
    } catch (err) {
      enqueueSnackbar((err as string) || t('bookings.failedToDelete'), { variant: 'error' });
    }
  }, [dispatch, itemToDeleteId, enqueueSnackbar, getAllBookingsList, t]);

  const renderRow = (item: Room | Booking | User | RoomFacility): React.ReactNode => {
    // Type guard to check if the item is a Booking
    if ('startDate' in item && 'endDate' in item && 'totalPrice' in item && 'user' in item) {

      return (
        <StyledTableRow key={item?._id} >
          <StyledTableCell component="th" scope="row">
            {item.room?.roomNumber || t('bookings.noRoom')}
          </StyledTableCell>
          <StyledTableCell>
            {item.startDate ? new Date(item.startDate).toLocaleDateString() : "-"}
          </StyledTableCell>
          <StyledTableCell>
            {item.endDate ? new Date(item.endDate).toLocaleDateString() : "-"}
          </StyledTableCell>
          <StyledTableCell>{item.totalPrice}</StyledTableCell>
          <StyledTableCell>{item.user?.userName || t('bookings.unknown')}</StyledTableCell>
          <StyledTableCell>{item.status}</StyledTableCell>
          <StyledTableCell>
            <TableActions handleDeleteItem={handleDeleteItem} item={item} route={''} />
          </StyledTableCell>

        </StyledTableRow>
      );
    }

    return null; // Handle other types such as Room, User, etc.
  }

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSize(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return (
    <Box>
      <Header title={t('bookings.title')} route="" />
      <DataTable
        loading={loading}
        items={bookings}
        page={page}
        size={size}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalCount={totalCount}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage={t('bookings.perPage')}
        columns={[
          t('bookings.columns.roomNumber'),
          t('bookings.columns.startDate'),
          t('bookings.columns.endDate'),
          t('bookings.columns.totalPrice'),
          t('bookings.columns.userName'),
          t('bookings.columns.status'),
          ''
        ]}
        renderRow={renderRow}
      />
      <DeleteConfirmation
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        confirm={ConfirmDelete}
        message={t('bookings.deleteConfirmation', { number: itemToDeleteNumber })}
        loading={deleteLoading}
      />
    </Box>
  );
}