import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deleteRoom, getAllRooms } from '../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoadingScreen from '../../shared/LoadingScreen/LoadingScreen';
import TableActions from '../../shared/TableActions/TableActions';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#203FC7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant='h6' sx={{ mb: '0', color: '#1F263E' }}>Rooms Table Details</Typography>
          <Box component='span' sx={{ mt: '0', color: '#323C47', fontSize: '14px' }}>You can check all details</Box>
        </Box>
        <Button component={Link} to={'/dashboard/room-data/new-room'} variant='contained' sx={{ backgroundColor: "#203FC7", color: 'white', fontWeight: 'bold', paddingInline: '30px' }}>Add New Room</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Capacity</StyledTableCell>
              <StyledTableCell>Facilities</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7}>
                  <LoadingScreen />
                </StyledTableCell>
              </StyledTableRow>
            ) : rooms?.map((room) => (
              <StyledTableRow key={room?._id}>
                <StyledTableCell component="th" scope="row">
                  {room.roomNumber}
                </StyledTableCell>
                <StyledTableCell>
                  <Box component='img' src={room?.images?.[0]} sx={{ width: '50px', height: '50px', borderRadius: '5px' }}></Box>
                </StyledTableCell>
                <StyledTableCell>{room?.price}</StyledTableCell>
                <StyledTableCell>{room?.discount}</StyledTableCell>
                <StyledTableCell>{room?.capacity}</StyledTableCell>
                <StyledTableCell>{room?.facilities?.map(facility => facility?.name).join(', ')}</StyledTableCell>
                <StyledTableCell>
                  <TableActions handleDeleteItem={handleDeleteItem} item={room} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination Component */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          labelRowsPerPage="Rooms per Page:"
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
        />
      </TableContainer>
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