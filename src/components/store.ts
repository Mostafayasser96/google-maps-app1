import React from 'react';
import {
	configureStore
} from '@reduxjs/toolkit';
import responseExtraReducer from './stateSlice';

const InitStore = () => {
	const store = configureStore({
		reducer: {
			response: responseExtraReducer
		}
	})
	return store;
}


export type RootState = ReturnType <typeof InitStore>;
export type AppDispatch = ReturnType<typeof InitStore>['dispatch'];
export default InitStore;