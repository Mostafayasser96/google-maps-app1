import React from "react";
import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";
import axiosInst from "./instance";
import { baseUrl } from "./consts";
import { useDispatch } from "react-redux";
import { ServerPoly } from "../types";
const initialState = {
	loading: false,
	serverData: [{
		color: '',
		label: '',
		points: [{ lat: '', lng: '', id: '' }]
	}],
	turfPaths: [[0, 0, 0]],
	error: ''
}
// export const turfPathsCreator = (response?: any) => {
// 	const turfPaths = response.data.data.map((zones: any) => {
// 		const turfPaths = zones.points.map((point:any) => {
// 			return [Number(point.lat), Number(point.lng)]
// 		})
// 	    turfPaths.push(turfPaths[0]);
// 		console.log(turfPaths);
// 	})
// 	return turfPaths;
// }
export const fetchZones = createAsyncThunk('/zones', async () => {
	const response = await axiosInst.get(baseUrl + '/zones');
	console.log(response.data.data);
	response.data.data.map((zones: ServerPoly) => {
		const turfPaths = zones.points.map((point) => {
			return [Number(point.lat), Number(point.lng), Number(point.id)];
		})
		turfPaths.push(turfPaths[0]);
    return turfPaths;
	})
	return response.data.data;
});
const zoneSlice = createSlice({
	name: 'response',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchZones.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchZones.fulfilled, (state, action) => {
			state.serverData = action.payload;
			
			state.loading = false;
		});
		builder.addCase(fetchZones.rejected, (state) => {
			state.loading = false;
		})
	}
})
const MyReducer = zoneSlice.reducer;
export default MyReducer;
