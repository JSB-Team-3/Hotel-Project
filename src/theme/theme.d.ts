// src/theme/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme {
    blueMain: string;
    liteMain: string;
    primaryLight: string;
    activeBreadcrumb: string;
    inactiveBreadcrumb: string;
    darkblue: string;
    errorMain: string;
    commentFormTitle?: string;
    sendButtonHover?: string;
    primaryCard:string,
    tableBg:string
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

  interface Palette {
    commentFormTitle?: PaletteColor;
    sendButtonHover?: PaletteColor;
  }

  interface PaletteOptions {
    commentFormTitle?: PaletteColorOptions;
    sendButtonHover?: PaletteColorOptions;
  }
  
}


