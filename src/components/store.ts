import React from 'react';
import {
	configureStore,
	Slice,
	StateFromReducersMapObject,
	PreloadedState,
	combineReducers
} from '@reduxjs/toolkit';
import {reducer1, reducer2 } from './stateSlice';




const reducer = {
	response: combineReducers({
		reducer1,
	  reducer2
	})
}

	export const store = configureStore({
		reducer,
	})


export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;