import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DataTable from '../shared/DataTable/DataTable';
import { Room } from '../../Interfaces/rooms.interface';
import { StyledTableCell} from '../shared/StyledTable/StyledTable';
import TableActions from '../shared/TableActions/TableActions';
import Header from '../shared/Header/Header';
import { Booking } from '../../Interfaces/bookings.interfaces';
import { getAllUsers } from '../store/users/usersThunk';
import { User } from '../../Interfaces/user.interface';
import { motion } from 'framer-motion';
import OptimizedImage from '../shared/OptimizedImage/OptimizedImage';
import { RoomFacility } from '../../Interfaces/facilities.interface';

export default function UsersList() {

  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);  
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users,totalCount } = useSelector((state: RootState) => ({
    loading: state.users.loading,
    users: state.users.users,
    totalCount: state.users.totalCount,
  }),
  shallowEqual);
  const getAllUsersList = async () => {
    console.log('get');
    
    try {
     await dispatch(getAllUsers({ 
             page: page + 1,
             size: size 
           })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || 'failed to get all Booking', { variant: 'error' });
    }
  };


  const renderRow = (item: Room | Booking | User|RoomFacility, index: number) => {
    console.log('row');
    
    if ('userName' in item) {
      const user = item as User;
  
      return (
        <motion.tr
          key={user._id}
          initial={{ opacity: 0,y: 20, }}
          animate={{opacity: 1,y: 0, transition: { 
            type: "spring",
            stiffness: 100,
            damping: 9,
            delay: index * 0.20,
            duration: 0.6
          }}}
           >
          <StyledTableCell component="th" scope="row">
            {user.userName}
        </StyledTableCell>
          <StyledTableCell>
          <Box>
              <OptimizedImage src={user.profileImage} width='60px'  />
            </Box>          </StyledTableCell>
          <StyledTableCell>{user.email}</StyledTableCell>
          <StyledTableCell>{user.phoneNumber}</StyledTableCell>
          <StyledTableCell>{user.country}</StyledTableCell>
          <StyledTableCell>{user.role}</StyledTableCell>
          <StyledTableCell>{user.verified ? 'Verified' : 'Not Verified'}</StyledTableCell>
          <StyledTableCell>
            <TableActions handleDeleteItem={noopDeleteHandler} item={user} route={''} />
          </StyledTableCell>
        </motion.tr>
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
  const noopDeleteHandler = () => {
  };
  useEffect(() => {
    getAllUsersList();
  }, [page, size]); 
  return (
    <Box>
      <Header title='Users' route='' />
     <DataTable
     loading={loading}
     items={users}
      page={page}
      size={size}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      labelRowsPerPage="booking per Page:"
      columns={['Username','Image', 'Email ', 'Phone Number', 'country', 'Role', 'status', '']} 
      renderRow = {renderRow}
     />
    </Box>
  );
}


