import React from 'react';
import {
	configureStore
} from '@reduxjs/toolkit';
import responseReducer from './stateSlice';

const InitStore = () => {
	const store = configureStore({
		reducer: {
			response: responseReducer
		}
	})
	return store;
}



export type AppDispatch = ReturnType<typeof InitStore>['dispatch'];
export default InitStore;