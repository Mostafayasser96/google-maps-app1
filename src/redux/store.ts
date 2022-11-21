import {
	configureStore,
} from '@reduxjs/toolkit';
import { reducer1 } from './stateSlice';

const store = configureStore({
	reducer: reducer1
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;