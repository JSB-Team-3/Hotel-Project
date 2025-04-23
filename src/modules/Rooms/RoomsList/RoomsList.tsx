import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppDispatch, RootState } from '../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deleteRoom, getAllRooms } from '../../store/rooms/roomsThunk';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import LoadingScreen from '../../shared/LoadingScreen/LoadingScreen';
import TableActions from '../../shared/TableActions/TableActions';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
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
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('')
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('')
  const [showDeleteModal,setShowDeleteModal] =useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>()
  const { loading, rooms,deleteLoading } = useSelector((state: RootState) => ({
    loading: state.rooms.loading,
    rooms: state.rooms.rooms,
    deleteLoading: state.rooms.deleteLoading
  })
  ,
  shallowEqual);
  const getAllRoomsList = async () => {

    try {
      await dispatch(getAllRooms({ page: 1, size: 5 })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || 'faild to get all rooms', { variant: 'error' });
    }
  }
  const handleDeleteItem =(itemId:string,itemNumber:string)=>{
    setItemToDeleteId(itemId)
    setItemToDeleteNumber(itemNumber)
    setShowDeleteModal(true)
  }
  const ConfirmDelete =async ()=>{
    try {
      const response = await dispatch(deleteRoom(itemToDeleteId)).unwrap();
      setShowDeleteModal(false)
      getAllRoomsList()
      setItemToDeleteId('')
      setItemToDeleteNumber('')
      enqueueSnackbar(response?.message || 'Room deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || 'faild to delete room', { variant: 'error' });
    }  }
  useEffect(() => {
    getAllRoomsList()
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>room Number</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>Capacity</StyledTableCell>
            <StyledTableCell>Facilities</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? <StyledTableRow ><StyledTableCell colSpan={7}><LoadingScreen /></StyledTableCell></StyledTableRow>
            : rooms?.map((room) => (
              <StyledTableRow key={room?._id}>
                <StyledTableCell component="th" scope="row">
                  {room.roomNumber}
                </StyledTableCell>
                <StyledTableCell ><Box component='img' src={room?.images?.[0]} sx={{ width: '50px', height: '50px', borderRadius: '5px' }}></Box></StyledTableCell>
                <StyledTableCell >{room?.price}</StyledTableCell>
                <StyledTableCell >{room?.discount}</StyledTableCell>
                <StyledTableCell >{room?.capacity}</StyledTableCell>
                <StyledTableCell >{room?.facilities?.map(facility => facility?.name).join(', ')}</StyledTableCell>
                <StyledTableCell ><TableActions handleDeleteItem={handleDeleteItem} item={room} /></StyledTableCell>

              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <Button onClick={getAllRoomsList}>ksksk</Button>
      <DeleteConfirmation 
      open={showDeleteModal}
      handleClose={()=>{setShowDeleteModal(false)}}
      confirm={ConfirmDelete}
      message={`Delete This Room ${itemToDeleteNumber}`} 
      loading={deleteLoading}
      />
    </TableContainer>
  )
}

