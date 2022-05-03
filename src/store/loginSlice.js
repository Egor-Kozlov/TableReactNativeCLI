import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLogin(state, action) {
      state.success = action.payload.success;
      state.login = action.payload.data.user.login;
      state.token = action.payload.data.token;
    },
    userLogout(state) {
      state = {};
    },
  },
});

export const {userLogin, userLogout} = loginSlice.actions;
export default loginSlice.reducer;
