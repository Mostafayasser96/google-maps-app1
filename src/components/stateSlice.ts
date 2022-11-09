import React from "react";
import {
	createSlice,
	createAsyncThunk,
	createReducer,
	PayloadAction
} from "@reduxjs/toolkit";
import axiosInst from "./instance";
import { baseUrl } from "./consts";
import { turfActionType, zonesType } from "./actions";
import { ServerPoly } from "../types";


const initialState = {
	loading: false,
	serverData: [{
		color: '',
		label: '',
		points: [{ lat: '', lng: '' }]
	}],
	turfPaths: [{lat: '', lng: ''}],
	error: ''
}

export const fetchZones = createAsyncThunk('/zones', async () => {
	const response = await axiosInst.get(baseUrl + '/zones');
	console.log(response.data.data);
	return response.data.data;
});
const zoneSlice = createSlice({
	name: 'response',
	initialState: initialState,
	// reducers: {
	//    reducer1: createReducer(initialState, (builder) => {
	// 		builder.addCase(zonesAction, (state, action) => {
  //         state.serverData = action.payload;
	// 		})
	// 	 }),
	// 	 reducer2: createReducer(initialState, (builder) => {
	// 		builder.addCase(turfsAction, (state, action) => {
	// 			   state.turfPaths = action.payload;
	// 		})
	// 	 })
	// },
	reducers: {
		reducer1: (state, action: PayloadAction<ServerPoly[]>) => {
			switch(action.type){
				case '/zones': 
            state.serverData = action.payload;
			}
		},
		reducer2: (state = initialState, action) => {
      switch(action.type){
				case '/turfs':
					state.turfPaths = action.payload;
			}
		}
	}
	
})
const MyReducer = zoneSlice.reducer;
export const { reducer1, reducer2 } = zoneSlice.actions;
export default MyReducer;
