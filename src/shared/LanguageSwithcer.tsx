import React, { memo, useState } from 'react';
import {
  Menu, MenuItem, IconButton, Typography, Box, Fade,
  Tooltip, Divider, ListItemIcon, Chip, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import TranslateIcon from '@mui/icons-material/Translate';
import { changeLanguage } from '../Locales/i18n';

// Extended language data with flag codes
const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧', region: 'United Kingdom' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', region: 'Saudi Arabia' },
];

const regions = {
  "": ['en', 'ar'],
};

interface LanguageSelectorProps {
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ color = 'inherit' }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    handleClose();
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      <Tooltip title={t("language.select")} arrow>
        <IconButton
          onClick={handleMenu}
          size={isMobile ? 'small' : 'medium'}
          color={color}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            position: 'relative',
            backgroundColor: open
              ? theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)'
              : 'transparent',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <LanguageIcon fontSize={isMobile ? 'small' : 'medium'} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: isMobile ? 14 : 16,
              height: isMobile ? 14 : 16,
              borderRadius: "50%",
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              fontSize: isMobile ? "0.5rem" : "0.6rem",
            }}
          >
            {currentLanguage.flag}
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 5,
          sx: {
            minWidth: 220,
            maxHeight: 400,
            overflow: "auto",
            borderRadius: "12px",
            mt: 1.5,
            "& .MuiList-root": {
              py: 1,
            },
            filter: "drop-shadow(0px 6px 20px rgba(0,0,0,0.15))",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, pb: 1, pt: 1.5, display: "flex", alignItems: "center" }}>
          <TranslateIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
          <Typography variant="subtitle2" color="text.secondary" fontWeight="500" noWrap>
            {t("language.select")}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Chip
          label={t("language.current")}
          size="small"
          color="primary"
          variant="outlined"
          icon={<CheckIcon fontSize="small" />}
          sx={{ mx: 2, mb: 1 }}
        />

        <MenuItem
          key={currentLanguage.code}
          onClick={() => handleLanguageChange(currentLanguage.code)}
          selected={true}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
            mb: 1,
            mx: 1,
            borderRadius: "8px",
          }}
        >
          <ListItemIcon sx={{ fontSize: "1.4rem", minWidth: 36 }}>
            {currentLanguage.flag}
          </ListItemIcon>
          <Typography variant="body2" noWrap>{currentLanguage.label}</Typography>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {Object.entries(regions).map(([region, langCodes]) => (
          <Box key={region}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 0.5,
                display: 'block',
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              {region}
            </Typography>

            {langCodes.map((code) => {
              const lang = languages.find((l) => l.code === code);
              if (lang && lang.code !== i18n.language) {
                return (
                  <MenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    sx={{
                      mx: 1,
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.06)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ fontSize: "1.4rem", minWidth: 36 }}>
                      {lang.flag}
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>{lang.label}</Typography>
                  </MenuItem>
                );
              }
              return null;
            })}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default memo(LanguageSelector);
