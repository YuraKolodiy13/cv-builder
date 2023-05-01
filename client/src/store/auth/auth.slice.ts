import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthModalOpen: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action){
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser(state, action){
      state.user = action.payload;
      localStorage.removeItem('user');
    },
    setIsAuthModalOpen(state, action){
      state.isAuthModalOpen = action.payload;
    }
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer;