import React from 'react';
import {
	configureStore,
	Slice,
	StateFromReducersMapObject,
	PreloadedState
} from '@reduxjs/toolkit';
import responseExtraReducer from './stateSlice';




const reducer = {
	response: responseExtraReducer
}

	export const store = configureStore({
		reducer,
	})


export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;