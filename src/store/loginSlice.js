import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLogin(state, action) {
      state.login = action.payload.user.login;
      state.token = action.payload.token;
    },
    userLogout(state) {
      state = {};
    },
  },
});

export const {userLogin, userLogout} = loginSlice.actions;
export default loginSlice.reducer;
