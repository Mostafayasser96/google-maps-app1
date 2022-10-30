import React from "react";
import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";
import axiosInst from "./instance";
import { baseUrl } from "./consts";
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

// export const turfPathsCreator = createAsyncThunk('/zones', async() => {
// 	const creatorResponse = await axiosInst.get(baseUrl + '/zones');
// 	console.log(creatorResponse.data.data);
// 	const turfPaths = creatorResponse.data.data.map((zones: ServerPoly) => {
// 		const newTurfPaths = zones.points.map((point) => {
// 			return [Number(point.lat), Number(point.lng), Number(point.id)];
// 		})
// 		newTurfPaths.push(newTurfPaths[0]);
// 		return newTurfPaths;
// 	})
// 	return turfPaths;
// })
export const fetchZones = createAsyncThunk('/zones', async () => {
	const response = await axiosInst.get(baseUrl + '/zones');
	console.log(response.data.data);
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
			const turfPathsMethod =  action.payload.map((zones: ServerPoly) => {
				const turfPaths = zones.points.map((point) => {
					return [Number(point.lat), Number(point.lng), Number(point.id)];
				})
				turfPaths.push(turfPaths[0]);
				return turfPaths;
			})
			state.turfPaths = turfPathsMethod;
			state.loading = false;
		});
		builder.addCase(fetchZones.rejected, (state) => {
			state.loading = false;
		});
		// builder.addCase(turfPathsCreator.fulfilled, (state, action) => {
		// 	state.turfPaths = action.payload;
		// })
	}
})
const MyReducer = zoneSlice.reducer;
export default MyReducer;
