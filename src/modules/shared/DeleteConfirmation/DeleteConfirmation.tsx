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
import deleteImg from '../../../assets/images/deleteImg.png'
const maodalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}
const DeleteConfirmation = ({ open, confirm, message, handleClose, loading }: ConfirmDeleteProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleClose(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={maodalStyles}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: (theme) => `1px solid ${theme.palette.error.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <CloseIcon color='error' onClick={() => handleClose(false)} />
              </Box>
            </Box>
            <Box component={'img'} src={deleteImg} />
            <Typography id="transition-modal-description" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              {message}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mb: 3 }}>
              {t('common.deleteConfirmation')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button
                sx={{
                  '&:hover':
                    { color: 'white' }
                }}
                variant="outlined"
                onClick={() => handleClose(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                disabled={loading}
                sx={{
                  '&:hover':
                    { backgroundColor: '#d32f2f', color: 'white' }
                }}
                startIcon={<DeleteIcon />}
                variant="outlined"
                color='error'
                onClick={() => confirm()}>
                {
                  loading ? <CircularProgress color="error" size={24}  /> :
                    t('common.delete')
                }
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteConfirmation;