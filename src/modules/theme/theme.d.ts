// src/theme/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme {
    blueMain: string;
    liteMain: string;
  }

  interface Theme {
    custom: CustomTheme;
  }

  interface ThemeOptions {
    custom?: Partial<CustomTheme>;
  }

  interface PaletteBackground {
    default: string;
    paper: string;
  }
}
