import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

const rootReducer = combineReducers({
  loginReducer: loginSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
