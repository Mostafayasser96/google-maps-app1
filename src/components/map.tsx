/* global google */
// the api key is: AIzaSyBodDPVtwbhGLWAUgkafBa_3ZoqyeZqyh8
// willy's api key is: AIzaSyBp1JgMEDxJ-uawz9mlkB3GIqodUMySycU
// the second api key is: AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg
// const { Marker, LoadScript } = require("../../");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;






import React, { useEffect, useState, useRef } from 'react';
import {
	useForm,
	SubmitHandler
} from 'react-hook-form';
import {
	useLoadScript,
	GoogleMap,
	Marker,
	// Polygon,
	Polyline,
	DrawingManager,
	InfoWindow
} from "@react-google-maps/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Modal,
	Button,
	Form
} from 'react-bootstrap';
import {
	withGoogleMap,
	withScriptjs
} from 'react-google-maps'
import {
	MyMarker,
	MyPolygon,
	MyPolyline,
	MyInfoWindow,
	Path,
	Inputs,
	Polygon
} from '../types';








const Home = () => {
	const center = { lat: -34.397, lng: 150.644 };
	const cairo = { lat: 30.033333, lng: 31.233334 };
	const alexandria = { lat: 31.205753, lng: 29.924526 };
	const portsaid = { lat: 31.2565, lng: 32.2841 };
	const zoom = 6;
	const centers = [
		{ lat: -34.397, lng: 150.644 },
		{ lat: 30.033333, lng: 31.233334 }
	]
	const libraries = ['drawing', 'places', 'geometry'];
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: '',
		libraries: ['drawing', 'places', 'geometry']
	})

	const [isMarkerShown, setIsMarkerShown] = useState<boolean>(false);
	const [markers, setMarkers] = useState<MyMarker[]>([]);
	const [polylines, setPolylines] = useState<MyPolyline[]>([]);
	const [area, setArea] = useState<number>();
	const [infoWindow, setInfoWindow] = useState<MyInfoWindow | undefined>();
	const [infoPosition, setInfoPosition] = useState<Path>();
	const [show, setShow] = useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [polygons, setPolygons] = useState<Polygon[]>([]);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
	const [color, setColor] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [paths, setPaths] = useState<void>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		setColor(data.color);
		setName(data.name);
		console.log('this is the color: ', color);
		reset({
			color: '',
			name: ''
		})
	}

	const onMapClicked = (e: google.maps.MapMouseEvent) => {
		const lat = e.latLng?.lat() || 0;
		const lng = e.latLng?.lng() || 0;
		console.log(lat, lng);
		setMarkers([
			...markers,
			{
				position: { lat, lng },
				name: 'this is marker',
				title: 'marker title'

			}
		])

		console.log(markers, markers.length);
		console.log(infoPosition);
	}

	useEffect(() => {
		setPolylines((previousState) => [
			...previousState,
			{
				path: markers.map(marker => marker.position),
				strokeColor: 'blue',
				strokeWeight: 2,
				strokeOpacity: .8

			}
		])


		// setPolygons((prevState) => [
		// 	...prevState,
		// 	{
		// 		// paths: polygons.map(polygon => polygon.setPaths(paths, paths)),
		// 		paths: paths,
		// 		options: {
		// 			strokeColor: 'blue',
		// 			strokeWeight: 2,
		// 			fillColor: color,
		// 			fillOpacity: 1,
		// 			strokeOpacity: .8,
		// 			zIndex: 1,
		// 			name: name,
		// 		}
		// 	}
		// ])
		// console.log('array of polygons: ', polygons, polygon);

	}, [markers, polygons, paths])


	// here we're going to work with the drawing manager
	const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
		console.log(drawingManager);
	}
	const onInfoWindowLoad = (infoWindow: google.maps.InfoWindow) => {
		console.log('infowindow is loaded');
	}


	const onPolygonComplete = (polygon: google.maps.Polygon) => {
		const path = polygon.getPath();
		console.log(polygon);
		console.log(path);


		const paths = polygon.setPaths(polygon.getPath().getArray());
		console.log(paths, polygon, polygon.getPaths());
        setPaths(paths);
        
		// const visibility = polygon.setOptions({
		// 	visible: false
		// })
		// console.log(visibility);



		// the infoWindow eventListener
		google.maps.event.addListener(polygon, 'click', function (event) {
			console.log('you clicked polygon:', event);
			const lat = event.latLng?.lat();
			const lng = event.latLng?.lng();
			console.log(lat, lng);

			setInfoPosition({
				lat: lat,
				lng: lng
			})
			const area = Number(google.maps.geometry.spherical.computeArea(path).toFixed(2));
			console.log(area);
			setArea(area);
			setIsMarkerShown(true);
			


		});

		
			
		




	}

	const onPolygonClick = (e: google.maps.MapMouseEvent) => {
		console.log(e.latLng, 'polygon');
		// const locationCheck = google.maps.geometry.poly.containsLocation(infoPosition, polygon)
	}

	if (!isLoaded) {
		return <div>Loading ...</div>
	} else {
		return (
			<div className="map">
				<GoogleMap
					zoom={zoom}
					center={cairo}
					mapContainerClassName='inner-map'
					mapContainerStyle={{ position: 'relative', width: '100%', height: '600px' }}
					onClick={onMapClicked}
				>

					<DrawingManager
						onLoad={onDrawingManagerLoad}
						onPolygonComplete={onPolygonComplete}
                    
						options={{
							drawingControl: true,
							polygonOptions: { fillColor: color }
						}}
					/>
					{
						isMarkerShown && <InfoWindow position={infoPosition} onLoad={onInfoWindowLoad} >
							<div>{area}</div>
						</InfoWindow>
					}
				</GoogleMap>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit(onSubmit)} className='form'>
							<label htmlFor='color' className='color-lbl'>Color: </label>
							<input
								className='color'
								id='color'
								type='text'
								placeholder='Insert Color'
								{...register('color', { required: true })} />
							{errors.color && <span>color is required</span>}
							<label htmlFor='name' className='name-lbl'>name: </label>
							<input
								className='name'
								id='name'
								type='text'
								placeholder='Insert Name'
								{...register('name', { required: true })} />
							{errors.name && <span>name is required</span>}
							<Button type="submit"
								className="sub-btn"

							>Change</Button>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
export default Home;