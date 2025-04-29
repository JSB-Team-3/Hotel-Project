import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  mode: 'light' | 'dark';
};

const initialState: ThemeState = {
  mode: (localStorage.getItem('theme') as 'light' | 'dark') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
    setMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      localStorage.setItem('theme', state.mode);
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
