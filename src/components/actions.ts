import { createAction } from "@reduxjs/toolkit";
import { ZonesType } from '../types';



const zonesType = '/zones';
export const zonesAction = createAction<ZonesType>(zonesType);


const turfsType = '/turfs';
export const turfsAction = createAction(turfsType, (payload: {lat: string, lng: string}[]) => {
  return {
    payload: payload
  }
});