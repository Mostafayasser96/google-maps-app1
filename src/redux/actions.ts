import { createAction } from "@reduxjs/toolkit";
import { 
  ZonesType,
  Path
} from './redux-types';



const zonesType = '/zones';
export const zonesAction = createAction<ZonesType>(zonesType);


const turfsType = '/turfs';
export const turfsAction = createAction(turfsType, (payload: Path[]) => {
  return {
    payload: payload
  }
});