
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deleteRoom, getAllRooms } from '../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../../shared/DataTable/DataTable';
import { Room } from '../../../Interfaces/rooms.interface';
import { StyledTableCell, StyledTableRow } from '../../shared/StyledTable/StyledTable';
import TableActions from '../../shared/TableActions/TableActions';
import Header from '../../shared/Header/Header';
import { Booking } from '../../../Interfaces/bookings.interfaces';
import { User } from '../../../Interfaces/user.interface';
export default function RoomsList() {
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);  
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, rooms, deleteLoading,totalCount } = useSelector((state: RootState) => ({
    loading: state.rooms.loading,
    rooms: state.rooms.rooms,
    deleteLoading: state.rooms.deleteLoading,
    totalCount: state.rooms.totalCount,
  }),
  shallowEqual);

  const getAllRoomsList = async () => {
    try {
      await dispatch(getAllRooms({ 
        page: page + 1,
        size: size 
      })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to get all rooms', { variant: 'error' });
    }
  };

  const handleDeleteItem = (itemId: string, itemNumber: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteNumber(itemNumber);
    setShowDeleteModal(true);
  };

  const ConfirmDelete = async () => {
    try {
      const response = await dispatch(deleteRoom(itemToDeleteId)).unwrap();
      setShowDeleteModal(false);
      getAllRoomsList();
      setItemToDeleteId('');
      setItemToDeleteNumber('');
      enqueueSnackbar(response?.message || 'Room deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to delete room', { variant: 'error' });
    }
  };
const renderRow = (item: Room | Booking |User ) => {
  if ('price' in item && 'capacity' in item) {
    const room = item as Room;
  
  return (
      <StyledTableRow key={room?._id}>
      <StyledTableCell component="th" scope="row">{room.roomNumber}</StyledTableCell>
      <StyledTableCell>
        <Box component="img" src={room?.images?.[0]} sx={{ width: '50px', height: '50px', borderRadius: '5px' }} />
      </StyledTableCell>
      <StyledTableCell>{room?.price}</StyledTableCell>
      <StyledTableCell>{room?.discount}</StyledTableCell>
      <StyledTableCell>{room?.capacity}</StyledTableCell>
      <StyledTableCell>{room?.facilities?.map(f => f.name).join(', ')}</StyledTableCell>
      <StyledTableCell>
        <TableActions handleDeleteItem={handleDeleteItem} item={room} route={`/dashboard/room-data/${room?._id}`} />
      </StyledTableCell>
    </StyledTableRow>
  );
}}
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
    getAllRoomsList();
  }, [page, size]); 
  return (
    <Box>
      <Header title='Room' route='/dashboard/room-data/new-room' />
     <DataTable
     loading={loading}
     items={rooms}
      page={page}
      size={size}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      labelRowsPerPage="Rooms per Page:"
      columns={['Room Number', 'Image', 'Price', 'Discount', 'Capacity', 'Facilities', '']} 
      renderRow = {renderRow}

     />
        <DeleteConfirmation
          open={showDeleteModal}
          handleClose={() => { setShowDeleteModal(false) }}
          confirm={ConfirmDelete}
          message={`Delete This Room ${itemToDeleteNumber}`}
          loading={deleteLoading}
        />
    </Box>
  );
}