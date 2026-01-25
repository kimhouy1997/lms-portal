import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isSidebarOpen: boolean;
  themeMode: 'light' | 'dark';
}

const initialState: AppState = {
  isSidebarOpen: true,
  themeMode: 'dark',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { toggleSidebar, setThemeMode } = appSlice.actions;
export default appSlice.reducer;
