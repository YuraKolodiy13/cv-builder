import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  notification: {
    snackbarMessage: '',
    openSnackbar: false,
    snackbarSeverity: 'info',
  }
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setNotificationMessage(state, action){
      state.notification = action.payload;
    },
  }
})

export const commonActions = commonSlice.actions
export const commonReducer = commonSlice.reducer;