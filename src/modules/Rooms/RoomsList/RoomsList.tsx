
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deleteRoom, getAllRooms } from '../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import { Box} from '@mui/material';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../../shared/DataTable/DataTable';
import { Room } from '../../../Interfaces/rooms.interface';
import { StyledTableCell, StyledTableRow } from '../../shared/StyledTable/StyledTable';
import TableActions from '../../shared/TableActions/TableActions';
import Header from '../../shared/Header/Header';
import { Booking } from '../../../Interfaces/bookings.interfaces';
import { User } from '../../../Interfaces/user.interface';
import OptimizedImage from '../../shared/OptimizedImage/OptimizedImage';
import { RoomFacility } from '../../../Interfaces/facilities.interface';

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
    console.log('get');
    
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
 
  const renderRow = (item: Room | Booking | User| RoomFacility) => {
    if ('price' in item && 'capacity' in item) {
      return (
        <StyledTableRow key={item?._id} >
          <StyledTableCell component="th" scope="row">{item.roomNumber}</StyledTableCell>
          <StyledTableCell>
          <Box  sx={{widht:"60px",height:"50px"}}>
              <OptimizedImage src={item?.images?.[0]} width='60px' height='50px'/>     
            </Box>
          </StyledTableCell>
          <StyledTableCell>{item.price}</StyledTableCell>
          <StyledTableCell>{item.discount}</StyledTableCell>
          <StyledTableCell>{item.capacity}</StyledTableCell>
          <StyledTableCell>{item?.facilities?.map(f => f.name).join(', ')}</StyledTableCell>
          <StyledTableCell>
            <TableActions handleDeleteItem={handleDeleteItem} item={item} route={`/dashboard/room-data/${item?._id}`} />
          </StyledTableCell>
        </StyledTableRow>
      );
    }
  
    return null;
  };
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