import { combineReducers } from 'redux';
import { applicationReducer } from './reducers/application.reducer';
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  applicationReducer: applicationReducer
});

export const store = configureStore({
  reducer: rootReducer,
});