import {Backdrop,Box,Modal,Fade,Typography,CircularProgress,useTheme,
} from '@mui/material';
import { FC } from 'react';
import { UserDetailsModalProps } from '../../../Interfaces/modal.interface';
import RenderViewContent from './RenderView';


const ViewDataModal: FC<UserDetailsModalProps> = ({
  open,
  handleClose,
  loading,
  data,
}) => {

 
  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
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
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <CircularProgress />
            </Box>
          ) : data ? (
            <RenderViewContent data={data} handleClose={handleClose} />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height={200} p={3}>
              <Typography variant="body1" color="text.secondary" align="center">
                No data available
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewDataModal;
