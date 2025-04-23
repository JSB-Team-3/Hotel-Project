import React, { useState } from 'react';
import { 
  Button, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress,
  Fade,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as CheckCircleIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface FileUploadProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  register: any;
  errors: any;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  setSelectedFile,
  register,
  errors,
  maxSize = 5 // Default 5MB
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const isRTL = i18n.dir() === 'rtl';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (file) {
      setIsLoading(true);
      setTimeout(() => {
        setSelectedFile(file);
        setIsLoading(false);
        setUploadSuccess(true);

        setTimeout(() => setUploadSuccess(false), 2000);
      }, 600);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${isDragging ? theme.palette.primary.main : theme.palette.divider}`,
        borderRadius: "12px",
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: isDragging ? `0 0 0 2px ${theme.palette.primary.main}` : 'none',
        direction: isRTL ? 'rtl' : 'ltr', // Direction based on language
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Grid container>
        <Grid size={7}  sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(2) }}>
          <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {selectedFile ? (
              <>
                <FileIcon sx={{ color: theme.palette.primary.main, mr: 1.5, flexShrink: 0 }} />
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography noWrap variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(selectedFile.size)}
                  </Typography>
                </Box>
                <Box sx={{ ml: 1.5, flexShrink: 0 }}>
                  <Button
                    size="small"
                    onClick={handleRemoveFile}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.error.main,
                      }
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </Button>
                </Box>
              </>
            ) : (
              <Typography sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }} variant="body2">
                {t('form.no_file')}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid size={5} sx={{ padding: theme.spacing(1.5), display: 'flex', alignItems: 'center', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} sx={{marginInlineEnd:1}} color="inherit" /> : uploadSuccess ? <CheckCircleIcon sx={{marginInlineEnd:1}} /> : <CloudUploadIcon sx={{marginInlineEnd:1}} />}
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: uploadSuccess ? theme.palette.success.main : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: uploadSuccess ? theme.palette.success.dark : theme.palette.primary.dark,
              },
              transition: 'background-color 0.3s ease',
            }}
          >
            {isLoading ? t('form.uploading') : uploadSuccess ? t('form.upload_success') : selectedFile ? t('form.change_image') : t('form.select_image')}
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              {...register('profileImage', {
                required: t('form.image_required'),
                validate: (value: FileList) => {
                  if (!selectedFile && !value?.[0]) return t('form.image_required');
                  const file = selectedFile || value?.[0];
                  if (!file) return true;
                  
                  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                  if (!validTypes.includes(file.type)) return t('form.invalid_image_type');

                  if (file.size > maxSize * 1024 * 1024) return t('form.file_too_large', { size: maxSize });
                  return true;
                },
              })}
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
      </Grid>

      <Fade in={!!errors.profileImage}>
        <Box sx={{ px: 2, pb: 1.5 }}>
          {errors.profileImage && (
            <Typography color="error" variant="caption" component="div">
              {errors.profileImage.message}
            </Typography>
          )}
        </Box>
      </Fade>

      <Box sx={{ borderTop: `1px dashed ${theme.palette.divider}`, padding: '8px 16px', backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', textAlign: isRTL ? 'right' : 'left' }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, opacity: 0.7 }}>
          {t('form.drag_drop_supported')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileUpload;
