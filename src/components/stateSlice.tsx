import React from "react";
import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";
import axiosInst from "./instance";
import { baseUrl } from "./consts";
import { ServerPoly } from "../types";
import * as turf from '@turf/turf';
const initialState = {
	loading: false,
	serverData: [{
		color: '',
		label: '',
		points: [{ lat: '', lng: '' }]
	}],
	turfPaths: [[0, 0, 0]],
	error: ''
}

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
			const turfPathsMethod = action.payload.map((zones: ServerPoly) => {
        const turfPaths = zones.points.map((point) => {
					return [Number(point.lat), Number(point.lng)];
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
	}
})
const MyReducer = zoneSlice.reducer;
export default MyReducer;
