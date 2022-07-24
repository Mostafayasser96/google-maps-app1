// the api key is : AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg
import React, {
	useEffect,
	useRef,
	ReactElement,
	useState,
	Children
} from 'react';
import ReactDom from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {
	useForm,
	SubmitHandler,
	FormState,
} from 'react-hook-form';
import {
	Modal,
	Form,
	Button
} from 'react-bootstrap';
import {
	Inputs,
	MyMap,
	Children1,
	MapProps
} from '../types';




const MyComponent = ({
	center,
	zoom,
	onClick,
	onIdle,
	handleData,
	style,
	// ...children
}: {
	center: google.maps.LatLngLiteral,
	zoom: number,
	onClick: (e: google.maps.MapMouseEvent) => void,
	onIdle: () => void,
	handleData: (myColor: string) => string
	style: any,
	children: {
		Marker: React.FC<google.maps.MarkerOptions>,
		Polygon: React.FC<google.maps.PolygonOptions>
	}
}) => {
	const ref: any = useRef();
	const [color, setColor] = useState<string>();
	// const center = { lat: 30.033333, lng: 31.233334 };
	// const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
	const [polygonOptions, setPolygonOptions] = useState<google.maps.PolygonOptions>({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,

	})
	const [show, setShow] = useState<boolean>(false);
	const toggleShow = () => setShow(!show);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		console.log(data.color, data.name);
		setColor(data.color);


		reset({
			color: '',
			name: ''
		})
	}

	const polyOptions = {
		fillColor: color,
		strokeWeight: 2,
		fillOpacity: .7,
		editable: true
	}

	useEffect(() => {

		const Map: google.maps.Map | null | undefined = new google.maps.Map(ref.current, {
			center,
			zoom,

		})

		Map.addListener('click', onClick);
		// Map.addListener('idle', onIdle);
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
			polygonOptions: {
				fillColor: color,
				strokeWeight: 2,
				fillOpacity: .7,
				editable: true
			},
			map: Map
		})


		const polygonsArr: google.maps.Polygon[] = [];
		const onPolygonComplete = (polygon: google.maps.Polygon) => {
			console.log('this is the polygon: ', polygon);
			polygonsArr.push(polygon);
			console.log('this is the array of polygons: ', polygonsArr);

			const onPolygonClick = (polygon: google.maps.Polygon) => {
				console.log('the polygon is clicked', polygon);
				toggleShow();
				setPolygonOptions({ fillColor: color });

				// polygonsArr.map((polygon: any, index: number) => {
				// 	polygon.setOptions({
				// 		fillColor: color
				// 	})


				// 	// if(currentHighlightedPolygon !== null){
				// 	//     currentHighlightedPolygon.setOptions({
				// 	// 		fillColor: '#02482b',
				// 	// 	})
				// 	// 	setCurrentHighlightedPolygon(polygon);
				// 	// }
				// })


				// polygon.setOptions({
				// 	fillColor: color,
				// 	strokeColor: 'red',
				// 	strokeWeight: 2,
				// 	strokeOpacity: .8
				// });    


			}
			// polygon.setMap(Map);





			// for(const polygon in polygonsArr){
			//   polygon.setOptions({
			// 		fillColor: color
			// 	})

			// }


			// for(const poly in polygonsArr){
			// 	const gridPoly = new google.maps.Polygon({
			// 		paths: polygonsArr[poly].getPaths(),
			// 		fillColor: ,
			//         strokeColor: 'red',
			// 		strokeWeight: 2,
			// 		fillOpacity: .8,
			// 	})
			// 	gridPoly.setMap(Map);
			// 	polygonsArr[poly] = gridPoly;
			// }


			// toggleShow();
			google.maps.event.addListener(polygon, 'click', onPolygonClick);

		}

		google.maps.event.addListener(drawingManager, 'polygoncomplete', onPolygonComplete);

	}, [onClick, onIdle, color]);



	return (
		<div ref={ref} id='map' className='map-mapComponent'>
			{/* <Marker position={center} title='this is marker' /> */}
			{
				React.Children.map(children: React.ReactNode , function(child: React.ReactNode){
                if(React.isValidElement(child)){
                 return React.cloneElement(child, {Map})
                }
        })  

        

        }
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
		</div>

	)
}
export default MyComponent;


