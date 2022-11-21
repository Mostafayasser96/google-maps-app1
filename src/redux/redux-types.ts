export interface ServerPoly {
	color: string;
	label: string;
	points: {lat: string, lng: string, id?: string}[];
	_id?: string;
}
export interface ZonesType {
	loading: boolean;
	serverData: ServerPoly[];
	turfPaths: {lat: string, lng: string}[];
	error: string;
}
export interface Path {
  lat: string,
  lng: string
}