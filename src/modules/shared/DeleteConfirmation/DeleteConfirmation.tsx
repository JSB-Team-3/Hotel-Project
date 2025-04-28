import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ConfirmDeleteProps } from '../../../Interfaces/props.interface';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import deleteImg from '../../../assets/images/deleteImg.png';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback } from 'react';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const DeleteConfirmation = ({
  open,
  confirm,
  message,
  handleClose,
  loading,
}: ConfirmDeleteProps) => {
  const { t } = useTranslation();
  const theme = useTheme(); // Access the current theme

  // Destructure values for efficient use
  const { error, text } = theme.palette;

  // Memoized close handler
  const handleCloseModal = useCallback(() => handleClose(false), [handleClose]);
  
  // Memoized confirm delete handler
  const handleConfirmDelete = useCallback(() => confirm(), [confirm]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
     <Fade in={open} timeout={100}> 
  <Box sx={{ ...modalStyles, bgcolor: theme.palette.background.paper }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `1px solid ${error.main}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <CloseIcon color="error" onClick={handleCloseModal} />
      </Box>
    </Box>
    <Box component={'img'} src={deleteImg} alt="delete" sx={{ transition: 'opacity 300ms ease-in-out' }} />
    <Typography
      id="transition-modal-description"
      sx={{
        mb: 3,
        fontWeight: 'bold',
        textAlign: 'center',
        color: text.primary,
      }}
    >
      {message}
    </Typography>
    <Typography
      id="transition-modal-description"
      sx={{
        mb: 3,
        color: text.secondary,
      }}
    >
      {t('common.deleteConfirmation')}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
      <Button
        sx={{
          '&:hover': { color: text.primary },
        }}
        variant="outlined"
        onClick={handleCloseModal}
      >
        {t('common.cancel')}
      </Button>
      <Button
        disabled={loading}
        sx={{
          '&:hover': { backgroundColor: error.main, color: 'white' },
        }}
        startIcon={<DeleteIcon />}
        variant="outlined"
        color="error"
        onClick={handleConfirmDelete}
      >
        {loading ? <CircularProgress color="error" size={24} /> : t('common.delete')}
      </Button>
    </Box>
  </Box>
</Fade>

    </Modal>
  );
};

export default memo(DeleteConfirmation);
