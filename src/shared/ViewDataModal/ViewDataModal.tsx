import {Backdrop,Box,Modal,Fade} from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { UserDetailsModalProps } from '../../Interfaces/modal.interface';
import RenderViewContent from './RenderView';
import Spiner from '../Spinner/Spiner';
import EmptyContent from '../EmptyContent/EmptyContent';

const ViewDataModal: FC<UserDetailsModalProps> = ({
  open,
  handleClose,
  loading,
  data,
}) => {
  
  const onModalClose = useCallback(() => handleClose(false), [handleClose]);

  return (
    <Modal
      open={open}
      onClose={onModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: 800,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            overflow: 'hidden',
            overflowY: 'auto',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {loading ? (
            <Spiner />
          ) : data ? (
            <RenderViewContent data={data} handleClose={handleClose} />
          ) : (
            <EmptyContent />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};




export default memo(ViewDataModal);
