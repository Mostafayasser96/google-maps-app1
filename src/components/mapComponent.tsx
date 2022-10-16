// the api key is : AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg
import React, {
  useEffect,
  useState
} from 'react';
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
  Inputs,
  MapProps,
  ServerPoly,
} from '../types';
import axiosInst from './instance';
import { baseUrl } from './consts';
import * as turf from '@turf/turf';
// import GetZones from './zoneGetter';

const MyComponent = ({
  center,
  zoom,
  handleData,
  style,
  children
}: {
  center: google.maps.LatLngLiteral,
  zoom: number,
  handleData: (myColor: string) => string
  style: { flexGrow: string, height: string },
  children: MapProps['children']
}) => {
  const ref: any = React.createRef();
  const [polygonToEdit, setPolygonToEdit] = useState<google.maps.Polygon>();
  const [objToUpdate, setObjToUpdate] = useState<ServerPoly>();
  const [myPoly, setMyPoly] = useState<ServerPoly>();
  const [isUpdate, setIsUpdate] = useState<boolean>();
  const [mapClass, setMapClass] = useState<google.maps.Map>();
  const [show, setShow] = useState<boolean>(false);
  const toggleShow = (polygon?: google.maps.Polygon) => {
    setPolygonToEdit(polygon ?? {} as google.maps.Polygon);
    setShow(true);
    console.log(show)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.color, data.name);
    console.log('the polygon to edit is: ',
      polygonToEdit?.getPaths()?.getArray()?.map(points => points.getArray().map((point) => {
        return (point.lat().toString(), point.lng().toString())
      }))
    );
    const points = polygonToEdit?.getPaths()?.getArray()['0'].getArray()?.map((point) => {
      return ({
        lat: point.lat().toString(),
        lng: point.lng().toString(),
      })
    });
    const objToSend: ServerPoly = {
      color: data.color,
      label: data.name,
      points: points as { lat: string; lng: string; id?: string }[],
    }
    console.log('this is the id of objToSend to the server: ', objToSend);
    if (objToUpdate?._id === undefined) {
      setIsUpdate(false);
      createZone(objToSend as ServerPoly);
      console.log('the polygon to edit is: ', polygonToEdit);
      console.log(objToUpdate, data.color, data.name);
      reset({
        color: '',
        name: ''
      });
    } else {
      updateZone({ ...objToUpdate, color: data.color, label: data.name } as ServerPoly);
      reset({
        color: '',
        name: ''
      });
    }
  }

    const zoneClickListener = (newPolygon: google.maps.Polygon, poly: ServerPoly) => {
      google.maps.event.addListener(newPolygon, 'click', (e) => {
        console.log('the zone click event is: ', e);
      console.log('the onClick handler zone is: ', newPolygon);
      setObjToUpdate({ ...poly });
      console.log(objToUpdate);
      setIsUpdate(true);
      toggleShow(newPolygon as google.maps.Polygon);
      setValue("color", poly?.color as string);
      setValue("name", poly?.label as string);
      })
    }
    // const onZoneClicked = (e: google.maps.MapMouseEvent) => {
    //   console.log('the zone click event is: ', e);
    //   // console.log('the onClick handler zone is: ', newPolygon);
    //   setObjToUpdate({ ...poly as ServerPoly });
    //   console.log(objToUpdate);
    //   setIsUpdate(true);
    //   // toggleShow(newPolygon as google.maps.Polygon);
    //   setValue("color", poly?.color as string);
    //   setValue("name", poly?.label as string);
    // }
   
  
  const getZones = async (mapClass: google.maps.Map) => {
    const response = await axiosInst.get(baseUrl + '/zones');
    console.log(response.data.data);
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
      setMyPoly(poly);
      zoneClickListener(newPolygon as google.maps.Polygon, poly as ServerPoly);
      // google.maps.event.addListener(newPolygon, 'click', onZoneClicked);
      // newPolygon.addListener('click', onZoneClicked);
    })
    return response.data.data;
  }

  // GetZones(mapClass as google.maps.Map);


  const createZone = async (objToSend: ServerPoly) => {
    console.log('the obj to send is: ', objToSend);
    const response = await axiosInst.post(baseUrl + '/zones', objToSend);
    console.log('response of creating new zone: ', response);
    await getZones(mapClass as google.maps.Map);
    // await GetZones(mapClass as google.maps.Map);
    setShow(false);
  }

  const updateZone = async (objToUpdate: ServerPoly) => {
    console.log('the zone to update is: ', objToUpdate);
    const response = await axiosInst.put(baseUrl + '/zones/' + objToUpdate?._id, objToUpdate);
    console.log('response of updating a zone: ', response);
    await getZones(mapClass as google.maps.Map);
    // await GetZones(mapClass as google.maps.Map);
    setShow(false);
  }

  const deleteZone = async (zoneToDelete: ServerPoly, mapZone: google.maps.Polygon) => {
    console.log('the zone to delete is: ', zoneToDelete);
    const response = await axiosInst.delete(baseUrl + '/zones/' + zoneToDelete?._id);
    response.status === 200 && mapZone.setMap(null);
    await getZones(mapClass as google.maps.Map);
    // await GetZones(mapClass as google.maps.Map);
    setShow(false);
  }
  const Map = (): google.maps.Map => {
    const myMap1 = new google.maps.Map(ref.current, {
      center,
      zoom,
    })
    return myMap1;
  }
  useEffect(() => {
    setMapClass(Map);
  }, [])
  const onPolygonComplete = async (polygon: google.maps.Polygon, myZones: ServerPoly[]) => {
    console.log('this is the polygon: ', polygon);
    const paths = polygon.getPaths().getArray();
    const newDrawerPolygon = new google.maps.Polygon({
      paths: paths,
      fillColor: 'black',
      strokeColor: 'red',
      strokeWeight: 2,
      strokeOpacity: .8
    })
    const newPaths = newDrawerPolygon.getPaths().getArray()[0].getArray().map((point) => {
      return ({ lat: point.lat().toString(), lng: point.lng().toString() })
    })
    console.log('inside drawer polygon: ', myZones);
    myZones.map((zones) => {
      const turfPaths = zones.points.map((point) => {
        return [Number(point.lat), Number(point.lng)]
      })
      console.log(turfPaths);
      turfPaths.push(turfPaths[0]);
      const poly1 = turf.polygon([turfPaths]);
      console.log(poly1);
      const turfPaths2 = newDrawerPolygon.getPaths().getArray()['0'].getArray().map((point) => {
        return [Number(point.lat()), Number(point.lng())]
      })
      turfPaths2.push(turfPaths2[0]);
      const poly2 = turf.polygon([turfPaths2]);
      console.log(poly2);
      const intersection = turf.intersect(poly1, poly2);
      if (intersection) {
        console.log('there is intersection, do not draw the polygon', newPaths);
        polygon.setMap(null);
      } else {
        toggleShow(newDrawerPolygon);
      }
    })
    setIsUpdate(false);
  }
  useEffect(() => {
    (async () => {
      if (mapClass) {
        console.log('this is map:', mapClass);
        const myZones = await getZones(mapClass);
        // const myZones = await GetZones(mapClass);
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.POLYGON,
            ]
          },
          map: mapClass,
        })
        google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
          onPolygonComplete(polygon, myZones);
        });
      }
    })()
  }, [mapClass])
  return (
    <div ref={ref} id='map' className='map-mapComponent'>
      <Modal show={show} onHide={() => setShow(!show)} onShow={() => console.log('showed')}>
        <Modal.Header>
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
              {...register('color', { required: true })}
            />
            {errors.color && <span>color is required</span>}
            <label htmlFor='name' className='name-lbl'>name: </label>
            <input
              className='name'
              id='name'
              type='text'
              placeholder='Insert Name'
              {...register('name', { required: true })}
            />
            {errors.name && <span>name is required</span>}
            {!isUpdate && <Button type='submit' className="sub-btn">Create</Button>}
            {isUpdate && <> <Button type='submit' className='sub-btn'>Update</Button>
              <Button type='button'
                className='sub-btn'
                onClick={() => { deleteZone(objToUpdate as ServerPoly, polygonToEdit as google.maps.Polygon) }}>
                Delete
              </Button></>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(!show)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default MyComponent;