import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface FileUploadProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  register: any;
  errors: any;
  t: (key: string) => string;
}

const FileUpload: React.FC<FileUploadProps> = ({ selectedFile, setSelectedFile, register, errors, t }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Grid container spacing={3} sx={{ width: '100%' , backgroundColor: "#F3F6F9",
        border: "1px solid #E0E3E7",
        borderRadius: "8px"
        , paddingInlineStart: "10px"
}}>
      <Grid size={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedFile ? (
          <Typography  sx={{color:"#9a9c9e"}} variant="body2">{selectedFile.name}</Typography>
        ) : (
          <Typography sx={{color:"#9a9c9e"}} variant="body2">{t('form.uploadimage')}</Typography>
        )}
      </Grid>

      <Grid size={5} sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" 
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ minWidth: 'auto', padding: '10px' ,width: "100%"}}>
          {t('form.uploadimage')}
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            {...register('profileImage', {
              required: t('form.image_required'),
              validate: () => {
                if (!selectedFile) return t('form.image_required');
                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validTypes.includes(selectedFile.type)) return t('form.invalid_image_type');
                return true;
              },
            })}
            onChange={handleFileChange}
          />
        </Button>

        {errors.profileImage && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.profileImage.message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default FileUpload;
