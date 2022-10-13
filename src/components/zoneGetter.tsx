import React from 'react';
import axiosInst from './instance';
import { baseUrl } from './consts';
import { ServerPoly } from '../types';



const GetZones = async (mapClass: google.maps.Map) => {
	const response = await axiosInst.get(baseUrl + '/zones');
	console.log('this is response inside its function: ', response);
	response.data.data.map((poly: ServerPoly) => {
		const paths = poly.points.map((point) => {
			return { lat: Number(point.lat), lng: Number(point.lng) }
		})
		const newPolygon = new google.maps.Polygon({
			paths: paths,
			fillColor: poly.color,
			strokeColor: poly.color,
			strokeWeight: 2,
			strokeOpacity: .8
		})
		newPolygon.setMap(mapClass as google.maps.Map);
		// newPolygon.addListener('click', onZoneClicked);
	})
	return response.data.data;
};
export default GetZones;