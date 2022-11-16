import React from 'react';
import {
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { 
	TypedUseSelectorHook,
	useSelector
} from 'react-redux';
import { reducer1 } from './stateSlice';

const store = configureStore({
	reducer: reducer1
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;