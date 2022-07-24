/* global google */
import React, { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useForm,
  SubmitHandler
} from 'react-hook-form';
import {
  Modal,
  Form,
  Button
} from 'react-bootstrap';
import {
  Wrapper 
} from '@googlemaps/react-wrapper';
import {
  Inputs,
  MapProps,
  Path,
  MyMap
} from '../types';


const Map = () => {
  const cairo = { lat: 30.033333, lng: 31.233334 };
  const alexandria = { lat: 31.205753, lng: 29.924526 };
  const portsaid = { lat: 31.2565, lng: 32.2841 };
  const [polygons2, setPolygons2] = useState<google.maps.Polygon[]>([]);
  const [polygon2, setPolygon2] = useState<google.maps.Polygon | undefined>();
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [position, setPosition] = useState<Path>();
  const [show, setShow] = useState<boolean>(false);
  const toggleShow = () => setShow(!show);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(data.color, data.name);
    reset({
      color: '',
      name: ''
    })
  }

  const loader = new Loader({
    apiKey: "",
    libraries: ['drawing', 'places', 'geometry']
  })

 
   



  useEffect(() => {
    const polyOptions = {
      fillColor: 'black',
      strokeWeight: 2,
      fillOpacity: .7,
      editable: true
    }

   
// Marker component
const Marker: React.FC<google.maps.MarkerOptions> = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  useEffect(() => {

    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
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
   




    loader.load().then(() => {
     
      // this is map element
      const Map: google.maps.Map | null | undefined= new window.google.maps.Map(document.getElementById('map') as HTMLDivElement, {
        center: cairo,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        zoomControl: true,
        
        

      })
      new google.maps.Marker({
        position: alexandria,
        map: Map,
        title: 'this is alexandria marker'
      })
      Map.addListener('click', (event: google.maps.MapMouseEvent) => {
        console.log('the map is clicked', event);
        
      })
  // Map.addListener('click', (event: google.maps.MapMouseEvent) => {
  //   console.log('the map is clicked', event);
  //   const lat = event.latLng?.lat() || 0;
  //   const lng = event.latLng?.lng() || 0;
  //   console.log('marker coordinates are: ', lat, lng);
  //   setPosition({
  //     lat: lat,
  //     lng: lng
  //   })
  //   setClicks([...clicks, event.latLng!]);
  //   console.log(clicks);
  //   const image =
  //   "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    
  
  // })


  
  
      // this is the drawingManager element
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.POLYGON,
          ]
        },
        polygonOptions: polyOptions,
        map: Map
      })
      
      
      const polygons: google.maps.Polygon[] = [];
      google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon: google.maps.Polygon) {
        
        console.log('this is the polygon', polygon);
        if (window.google) {
          console.log('its true');
        }
        const locations = polygon.getPaths().getArray();
        console.log('polygon coordinates are: ', locations);
        polygons.push(polygon);
        console.log('array of polygons', polygons);

        const clickHandler = () => {
          console.log('polygon is clicked');
          toggleShow();
        }
        polygon.addListener('click', clickHandler);


      })


    })
    

  }, [polygons2])








  return (
    <div className='parent'>
     {/* <Wrapper apiKey={"AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg"}> */}

    
      <div id='map' style={{ width: '100%', height: '600px' }}>

         {/* <Marker position={position} title='this is marker' /> */}
      {/* {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { Map });
      }
    })} */}
     
      </div>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
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
          <Button variant="secondary" onClick={toggleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </Wrapper> */}
    </div>

  )
}
export default Map;

