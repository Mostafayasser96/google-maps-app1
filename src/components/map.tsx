/* global google */
// the api key is: AIzaSyBodDPVtwbhGLWAUgkafBa_3ZoqyeZqyh8
// willy's api key is: AIzaSyBp1JgMEDxJ-uawz9mlkB3GIqodUMySycU
// the second api key is: AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg
// const { Marker, LoadScript } = require("../../");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;






import React, { useEffect, useState } from 'react';
import {
    useLoadScript,
    GoogleMap,
    Marker,
    Polygon,
    Polyline
} from "@react-google-maps/api";
// import { Marker } from "react-google-maps"
// import Marker from 'react-google-maps/lib/components/Marker';
// import {
//     MarkerClusterer as GoogleMapMarker,
// ,
//   } from '@react-google-maps/marker-clusterer';
// import { Polygon } from '@react-google-maps/api';
import {
    // Marker,
    withGoogleMap,
    withScriptjs
} from 'react-google-maps'
import { Bundle } from 'typescript';


interface MyMarker{
    position: {lat: number, lng: number}
    title: string
    name: string
    
}
interface MyPolyline{
    path: Path[]
    strokeColor: string
    strokeWeight: number
    strokeOpacity: number
}

interface Path{
    lat: number
    lng: number
}
const Home = () => {
    const center = { lat: -34.397, lng: 150.644 };
    const cairo = {lat: 30.033333, lng: 31.233334};
    const alexandria = {lat: 31.205753, lng: 29.924526};
    const portsaid = {lat: 31.2565 , lng: 32.2841};
    const zoom = 8;

    const centers = [
        { lat: -34.397, lng: 150.644 },
        {lat: 30.033333, lng: 31.233334}
    ]
    const [isMarkerShown, setIsMarkerShown] = useState<boolean>(true);
    const [markers, setMarkers] = useState<MyMarker[]>([]);
    const [polylines, setPolylines] = useState<MyPolyline[]>([]);
    const onLoad = (marker: MyMarker) => {
        console.log('marker: ' + marker.position);
    }
    const onMapClicked = (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat() || 0;
        const lng = e.latLng?.lng() || 0;
        console.log(lat, lng);
         setMarkers([
             ...markers,
             {
               position: {lat, lng},
               name: 'this is marker',
               title: 'marker title'
               
             }
         ])
         console.log(markers, markers.length);
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: '',
    })
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
    }, [markers])
    const options = {
        fillColor: "black",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 100
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
                    <Marker position={{ lat: 30.033333, lng: 31.233334 }}
                            
                    />
                    <Marker position={alexandria}
                            
                    />
                    <Marker 
                           position={portsaid}
                    />
                    <Polygon paths={[cairo, alexandria, portsaid]} 
                             options={options}
                    
                    />
                    {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
                    {markers.map((marker, index) => {
                        return(
                            <Marker 
                               position={marker.position}
                               key={index}
                               title={marker.title}
                            
                            />
                        )
                    })}
                    {polylines.map((polyline, index) => {
                        return(
                            <Polyline 
                               key={index}
                               path={polyline.path}

                            />
                        )
                    })}
                </GoogleMap>
            </div>

        )
    }
}
export default Home;