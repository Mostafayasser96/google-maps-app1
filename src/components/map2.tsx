import { useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState, useRef } from 'react';
import {
	useForm,
	SubmitHandler
} from 'react-hook-form';
import {
	GoogleMap,
	Marker
} from '@react-google-maps/api';
import {
	MyMarker
} from '../types';



const Home = () => {
	const center = { lat: -34.397, lng: 150.644 };
	const cairo = { lat: 30.033333, lng: 31.233334 };
	const alexandria = { lat: 31.205753, lng: 29.924526 };
	const portsaid = { lat: 31.2565, lng: 32.2841 };
	const zoom = 6;
	const libraries = ['places', 'geometry'];
	const [markers, setMarkers] = useState<MyMarker[]>([]);
	const [lat, setLat] = useState<number>();
	const [lng, setLng] = useState<number>();
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: '',
	})
	

  const onMapClicked = (e: google.maps.MapMouseEvent) => {
		const lat = e.latLng?.lat() || 0;
		const lng = e.latLng?.lng() || 0;
		setLat(lat);
		setLng(lng);
		console.log(lat, lng);
		setMarkers([
			...markers,
			{
				position: {lat, lng},
				name: 'marker name',
				title: 'marker title'
			}
		])
		console.log('the marker is here: ', markers);
	}




	if (!isLoaded) {
		return <div>Loading ...</div>
	} else {
		return (
			<div className='map'>
				<GoogleMap
					zoom={zoom}
					center={cairo}
					mapContainerClassName='inner-map'
					mapContainerStyle={{ position: 'relative', width: '100%', height: '600px' }}
					onClick={onMapClicked}
				>
           {/* {markers.map((marker, index) => {
						 return(
							  
					 })} */}
				</GoogleMap>
			</div>
		)
	}



}
export default Home;