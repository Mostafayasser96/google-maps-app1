// the package used here is: react-google-maps
import React, { useState, useEffect } from 'react';
import {
	useForm,
	SubmitHandler
} from 'react-hook-form';
import {
	GoogleMap,
	Marker,
	Polyline,
	Polygon,
	// InfoWindow,
	withScriptjs,
	withGoogleMap,
} from 'react-google-maps';
import {
	Modal,
	Button,
	Form
} from 'react-bootstrap';
import {
	MyMarker,
	MyPolyline,
	Path,
	Inputs
} from '../types';
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';

const Home = () => {
	const center = { lat: -34.397, lng: 150.644 };
	const cairo = { lat: 30.033333, lng: 31.233334 };
	const alexandria = { lat: 31.205753, lng: 29.924526 };
	const portsaid = { lat: 31.2565, lng: 32.2841 };



	// states for arrays of markers and polylines
	const [markers, setMarkers] = useState<MyMarker[]>([]);
	const [polylines, setPolylines] = useState<MyPolyline[]>([]);
	const [infoShow, setInfoShow] = useState<boolean>(false);
	const [area, setArea] = useState<number>();
	const [infoPosition, setInfoPosition] = useState<Path>();
	const [show, setShow] = useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
	const [color, setColor] = useState<string>('');
	const [name, setName] = useState<string>('');

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		setColor(data.color);
		setName(data.name);
		// const colorValue = (document.getElementById('color') as HTMLInputElement).value;
		// setColor(colorValue);
		console.log('this is the color: ', color);
		reset({
			color: '',
			name: ''
		})
	}
	const onMapClick = (e: google.maps.MapMouseEvent) => {
		const lat = e.latLng?.lat() || 0;
		const lng = e.latLng?.lng() || 0;
		console.log(lat, lng);
		setMarkers([
			...markers,
			{
				position: { lat, lng },
				name: 'markers name',
				title: 'markers title'
			}
		])
		console.log('the array of markers is here: ', markers.length);
		console.log(markers);
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
		console.log('array of polylines: ', polylines);






	}, [markers])

	const onPolygonComplete = (p: google.maps.Polygon) => {
		// const lat = p.getPaths().getArray()[0].Qd[1].lat();
		// const lng = p.getPaths().getArray()[0].Qd[1].lng();
		// const paths = p.getPaths().getArray()[0].Qd[0];
		const path = p.getPath();
		console.log(p);
		console.log(path);
		// console.log('polygon paths: ', lat, lng);


		google.maps.event.addListener(p, 'click', function (event) {
			console.log('you clicked the polygon', event);
			const lat = event.latLng?.lat();
			const lng = event.latLng?.lng();
			console.log('lat and lng in info position: ', lat, lng);
			setInfoPosition({
				lat: lat,
				lng: lng
			})
			const area = Number(google.maps.geometry.spherical.computeArea(path).toFixed(2));
			setArea(area);
			setInfoShow(true);
			handleShow();
			console.log('the area of polygon is: ', area, infoShow);
			// const locationCheck = google.maps.geometry.poly.containsLocation(infoPosition, p)
		})

	}
	const onInfoWindowLoad = () => {
		console.log('the info window is loaded');
	}
	return (
		<>
			<GoogleMap
				defaultZoom={8}
				defaultCenter={cairo}
				onClick={onMapClick}
			>
				<Marker position={alexandria} />
				<Marker position={cairo} />
				<Marker position={portsaid} />
				<Polygon paths={[cairo, alexandria, portsaid]} />
				{/* {markers.map((marker, index) => {
				return (
					<Marker
						key={index}
						position={marker.position}
						title={marker.title}
					/>
				)

			})} */}


				<DrawingManager
					onPolygonComplete={onPolygonComplete}
				/>
				{
					infoShow &&
					<InfoWindow position={infoPosition}>
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
		</>

	)
}
const WrappedMap = withScriptjs(withGoogleMap(Home));
export default WrappedMap;