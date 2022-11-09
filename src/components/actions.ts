import {  createAction } from "@reduxjs/toolkit";
import { PayloadType, ServerPoly } from "../types";

export const zonesType = '/zones';
export const turfActionType = '/turfs';

// export const zonesAction = createAction(zonesType, (payload: ServerPoly[]) => {
//   return  { 
//     payload: payload
//   };
// });


// export const turfsAction = createAction(turfActionType, (payload: PayloadType[]) => {
//   return {
//     payload: payload
//   }
// });

// export const turfsAction = createAction<PayloadAction[]>(turfActionType);

// export const turfsAction = createAction(turfActionType, (payload: PayloadType[]) => {
//   return {
//     payload: payload
//   }
// });