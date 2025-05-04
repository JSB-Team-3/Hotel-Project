import { AppDispatch, RootState } from '../../../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DeleteConfirmation from '../../../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../../../shared/DataTable/DataTable';
import { Room } from '../../../Interfaces/rooms.interface';
import { StyledTableCell, StyledTableRow } from '../../../shared/StyledTable/StyledTable';
import TableActions from '../../../shared/TableActions/TableActions';
import Header from '../../../shared/Header/Header';
import { Booking } from '../../../Interfaces/bookings.interfaces';
import { User } from '../../../Interfaces/user.interface';
import { deleteAd, getAds } from '../../../store/ads/adsthunk';
import { Ad } from '../../../Interfaces/ads.interfaces';
import { RoomFacility } from '../../../Interfaces/facilities.interface';
import { useTranslation } from 'react-i18next';
import AdsData from './AdsData';

export default function Ads() {
  const { t } = useTranslation();
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [adId, setAdId] = useState<string>('');
  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);  
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, ads, deleteLoading, totalCount } = useSelector((state: RootState) => ({
    loading: state.ads.loading,
    ads: state.ads.ads,
    deleteLoading: state.ads.deleteLoading,
    totalCount: state.ads.totalCount,
  }),
  shallowEqual);

  const getAllAdsList = async () => {
    try {
     await dispatch(getAds({ 
             page: page + 1,
             size: size 
           })).unwrap();
    } catch (err) {
      enqueueSnackbar(err as string || t('ads.failedToGet'), { variant: 'error' });
    }
  };

  const handleDeleteItem = (itemId: string, itemNumber: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteNumber(itemNumber);
    setShowDeleteModal(true);
  };
  const handleEditItem = (item: Ad) => {
    setAdId(item?._id);
    setShowEditModal(true);
  };

  const ConfirmDelete = async () => {
    try {
      const response = await dispatch(deleteAd(itemToDeleteId)).unwrap();
      setShowDeleteModal(false);
      getAllAdsList();
      setItemToDeleteId('');
      setItemToDeleteNumber('');
      enqueueSnackbar(response?.message || t('ads.deleteSuccess'), { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err as string || t('ads.failedToDelete'), { variant: 'error' });
    }
  };
  const renderRow = (item: Room | Booking | User | Ad |RoomFacility) => {
    if ('isActive' in item && 'room' in item ) {
      const ad = item as Ad;
      return (
        <StyledTableRow key={ad?._id}>
          <StyledTableCell component="th" scope="row">
            {ad?.room?.roomNumber || t('ads.noRoomAssigned')}
          </StyledTableCell>
           <StyledTableCell>{ad?.room?.price}</StyledTableCell>
                <StyledTableCell>{ad?.room?.discount}</StyledTableCell>
                <StyledTableCell>{ad?.room?.capacity}</StyledTableCell>
                <StyledTableCell style={{ color: ad?.isActive ? 'green' : 'red' }}>
                    {ad?.isActive ? t('ads.active') : t('ads.inactive')}
                </StyledTableCell>
          <StyledTableCell>
            <TableActions handleDeleteItem={handleDeleteItem} handleEditAd={handleEditItem} item={ad} route={''} />
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
    getAllAdsList();
  }, [page, size]); 
  return (
    <Box>
      <Header title={t('ads.title')} route='' getAllAdsList={getAllAdsList} />
     <DataTable
      loading={loading}
      items={ads}
      page={page}
      size={size}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      totalCount={totalCount}
      rowsPerPageOptions={[5, 10, 25]}
      labelRowsPerPage={t('ads.bookingPerPage')}
      columns={[
        t('ads.roomNumber'), 
        t('ads.price'), 
        t('ads.discount'), 
        t('ads.capacity'), 
        t('ads.status'), 
        ''
      ]} 
      renderRow={renderRow}
     />
        <DeleteConfirmation
          open={showDeleteModal}
          handleClose={() => { setShowDeleteModal(false) }}
          confirm={ConfirmDelete}
          message={t('ads.deleteConfirmation', { roomNumber: itemToDeleteNumber })}
          loading={deleteLoading}
        />
        <AdsData  
        open={showEditModal}
        handleClose={setShowEditModal}
        id={adId}
        getAllAdsList={getAllAdsList}
        />
    </Box>
  );
}