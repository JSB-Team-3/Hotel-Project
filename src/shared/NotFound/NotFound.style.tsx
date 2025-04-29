// NotFound.styled.tsx
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PRIMARY = '#3061C8';
export const PRIMARY_LIGHT = '#5682E5';
export const PRIMARY_DARK = '#1E4AA3';
export const ACCENT = '#61C8C0';

export const NotFoundPageContainer = styled(Box)({
  background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 50%, ${PRIMARY_LIGHT} 100%)`,
  minHeight: '100vh',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
});

export const Overlay = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.2) 100%)',
  zIndex: 1,
});

export const CircleDecoration = styled(Box)<{ size: number; left: string; top: string; }>(({ size, left, top, color }) => ({
  position: 'absolute',
  width: size,
  height: size,
  border: `2px solid ${color}`,
  borderRadius: '50%',
  left,
  top,
  opacity: 0.3,
}));

export const DotGrid = styled(Box)<{ left: string; top: string }>(({ left, top }) => ({
  position: 'absolute',
  width: 120,
  height: 120,
  backgroundImage: `radial-gradient(${ACCENT} 1px, transparent 1px)`,
  backgroundSize: '12px 12px',
  left,
  top,
  opacity: 0.3,
  zIndex: 0,
}));

export const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  width: '100%',
});

export const LogoContainer = styled(Box)({
  marginBottom: '20px',
});

export const ContentBox = styled(Box)({
  marginTop: '20px',
});

export const ErrorImage = styled('img')({
  maxWidth: '100%',
  filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))',
});

export const BlueButton = styled(Button)({
  background: `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 100%)`,
  color: '#fff',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: '50px',
  marginTop: '20px',
  '&:hover': {
    background: `linear-gradient(90deg, ${PRIMARY_LIGHT} 0%, ${PRIMARY} 100%)`,
  },
});

export const GradientHeading = styled(Typography)({
  fontWeight: 800,
  backgroundImage: `linear-gradient(45deg, #FFFFFF 30%, ${ACCENT} 90%)`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});
