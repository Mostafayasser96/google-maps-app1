import {
	createSlice,
} from "@reduxjs/toolkit";


const initialState = {
	loading: false,
	serverData: [{
		color: '',
		label: '',
		points: [{ lat: '', lng: '' }],
	}],
	turfPaths: [{ lat: '', lng: ''}],
	error: ''
}

const zoneSlice = createSlice({
	name: 'response',
	initialState,
	reducers: {
		reducer1: (state, action) => {
			state.serverData = action.payload.serverData;
		}
	}
});

export const { reducer1 } = zoneSlice.actions;

export default zoneSlice.reducer;










