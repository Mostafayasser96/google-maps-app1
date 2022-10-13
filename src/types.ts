export interface Path {
	lat: number
	lng: number
}
export interface Inputs {
	color: string
	colorRequired: string
	name: string
	nameRequired: string
}
export interface MapProps extends google.maps.MapOptions {
	style: { [key: string]: string };
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	children?: {
		Marker: React.FC<google.maps.MarkerOptions>,
		Polygon: React.FC<google.maps.PolygonOptions>
    }[];
	ref: React.RefObject<HTMLInputElement>
}

export interface LoginInputs{
    username: string;
	usernameRequired: string;
	password: string;
	passwordRequired: string
}
export interface ServerPoly {
	color: string;
	label: string;
	points: {lat: string, lng: string, id?: string}[];
	_id?: string;
}