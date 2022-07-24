import React from "react"

export interface MyMarker {
	position: { lat: number, lng: number }
	title: string
	name: string

}
export interface MyPolygon {
	paths: Path[]
	strokeColor: string
	strokeWeight: number
	strokeOpacity: number
	options: Options
}
export interface MyPolyline {
	path: Path[]
	strokeColor: string
	strokeWeight: number
	strokeOpacity: number
}
export interface MyInfoWindow {
	content: string
	position: { lat: number, lng: number }
}
export interface Path {
	lat: number
	lng: number
}
interface Options {
	fillColor: string
	fillOpacity: number
	strokeColor: string
	strokeOpacity: number
	strokeWeight: number
	zIndex: number

}
export interface Inputs {
	color: string
	colorRequired: string
	name: string
	nameRequired: string
}
// export type Polygon = google.maps.Polygon & {
// 	Paths: Path[],
// 	options: {
// 		fillColor: string
//     fillOpacity: number
//     strokeColor: string
//     strokeOpacity: number
//     strokeWeight: number
//     zIndex: number
// 		name: string
// 	}
// }

export type Polygon = google.maps.Polygon & {
	options: {
		fillColor: string
		fillOpacity: number
		strokeColor: string
		strokeOpacity: number
		strokeWeight: number
		zIndex: number
		name: string
	}
}

export interface MyMarker4 {
	position: { lat: number, lng: number }
	map: google.maps.Map | google.maps.StreetViewPanorama | null;
	title: string
	name: string
}
export interface MapProps extends google.maps.MapOptions {
	style: { [key: string]: string };
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	children?: React.ReactNode;
}
export interface Inputs2{
    zoom: string;
	zoomRequired: string;
	lat: string;
	latRequired: string
}
export interface MyMap extends google.maps.MapOptions {
	children: {
		Marker: React.FC<google.maps.MarkerOptions>,
        Polygon: React.FC<google.maps.PolygonOptions>
	}
}
export interface Children1 {
	Marker: React.FC<google.maps.MarkerOptions>,
	Polygon: React.FC<google.maps.PolygonOptions>
}