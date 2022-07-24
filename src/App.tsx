import React, { useEffect, useRef, useState } from 'react';
import './App.css';
// import Home from './components/map';
// import Home from './components/map2';
// import WrappedMap from './components/map3';
// import InitMap from './components/map4';
import MyComponent from './components/mapComponent';
// import Map from './components/mapComponent2';
import {
  MyMarker,
} from './types';
import {
  Wrapper,
  Status
} from '@googlemaps/react-wrapper';
import { propTypes } from 'react-bootstrap/esm/Image';



function App() {
  const center = { lat: 30.033333, lng: 31.233334 };
  const alexandria = { lat: 31.200092, lng: 29.918739};
  const portsaid = { lat: 31.265289, lng: 32.301865};
  const zoom = 5;
  const [markers, setMarkers] = useState<MyMarker[]>([]);
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const [isMarkerShown, setIsMarkerShown] = useState<boolean>(false);
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  }

  // const onMapClick = (e: google.maps.MapMouseEvent) => {
  //   console.log('the map is clicked', e);
  //   const lat = e.latLng?.lat() || 0;
  //   const lng = e.latLng?.lng() || 0;
  //   console.log('the click coordinates are: ', lat, lng);
  //   setMarkers([
  //     ...markers,
  //     {
  //       position: { lat, lng },
  //       title: 'this is the marker title',
  //       name: 'this is markers name'
  //     }
  //   ])
  //   setIsMarkerShown(true);
  //   console.log('array of markers: ', markers);


  // }
  const onIdle = () => {
    console.log('idle function triggered');
  }

  const onMapClicked = (e: google.maps.MapMouseEvent) => {
    console.log('the map is clicked', e, e.latLng);
  }
  const handleData = (myColor: string) => {
    return myColor;
  };

  // the marker component
  const Marker: React.FC<google.maps.MarkerOptions> = (options: google.maps.MarkerOptions) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    useEffect(() => {

      if (!marker) {
        setMarker(new google.maps.Marker());
      }

      return () => {
        marker?.setMap(null);
      }
    }, [marker]);

    useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
  }

  // the Polygon component
  const Polygon: React.FC<google.maps.PolygonOptions> = (options: google.maps.PolygonOptions) => {
    const [polygon, setPolygon] = useState<google.maps.Polygon>();
    useEffect(() => {
      if (!polygon) {
        setPolygon(new google.maps.Polygon());
      }
      return () => {
        polygon?.setMap(null);
      }
    }, [polygon])
    useEffect(() => {
      if (polygon) {
        polygon.setOptions(options);
      }

    }, [polygon, options]);
    return null;
  }



  return (
    <div className="App">
      {/* <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `620px` }} />}
        mapElement={<div style={{ height: `100%` }} />} /> */}
      {/* <InitMap /> */}

      {/* <Map /> */}

      {/* the approach for mapComponent (map element inside a Wrapper) */}
      <Wrapper apiKey={'AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg'} render={render} libraries={['places', 'drawing', 'geometry']}>
        <MyComponent
          center={center}
          onClick={onMapClicked}
          onIdle={onIdle}
          handleData={handleData}
          zoom={zoom}
          style={{ flexGrow: "1", height: '600px' }}
          children={{ Marker, Polygon }}
        />
       <Marker position={center} title='this is marker' >
       
        </Marker>
        


        {/* <Polygon paths=[center, alexandria, portsaid] strokeColor='red' /> */}
      </Wrapper>

      {/* the approach for mapComponent2 (map element inside a googlemaps/js-api-loader) */}
      {/* <Wrapper apiKey={"AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg"}> */}
      {/* <Map /> */}
      {/* <Marker position={center} /> */}

      {/* </Wrapper> */}


    </div>
  );
}

export default App;