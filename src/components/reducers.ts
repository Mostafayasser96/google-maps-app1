import { createReducer, PayloadAction } from "@reduxjs/toolkit"
// import { zonesAction } from "./actions"

const initialState = {
  turfPaths: [{ lat: '', lng: ''}],
}

const turfReducer = createReducer(initialState, (builder) => {
  // builder.addCase(zonesAction, (state, action) => {
  //     // state.turfPaths = action.payload;
  // })
})