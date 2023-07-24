import { configureStore } from '@reduxjs/toolkit';
import { vendorsReducer } from './reducer';

export default configureStore({
  reducer: { vendors: vendorsReducer },
});
