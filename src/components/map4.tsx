import React, { useEffect, useState } from "react";
import {
	MyMarker4,
	Path,
	Inputs
} from "../types";
import { Loader } from "@googlemaps/js-api-loader";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";

const InitMap = () => {
	const cairo = { lat: 30.033333, lng: 31.233334 };
	const alexandria = { lat: 31.205753, lng: 29.924526 };
	const portsaid = { lat: 31.2565, lng: 32.2841 };
	const [markers, setMarkers] = useState<MyMarker4[]>([]);
	const [infoPosition, setInfoPosition] = useState<Path>();
	const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

	const [area, setArea] = useState<string>();
	const [show, setShow] = useState<boolean>(false);
	const toggleShow = () => setShow(!show);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();
	const [color, setColor] = useState<string>("");
	const [name, setName] = useState<string>("");
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		setColor(data.color);
		setName(data.name);
		console.log("these are color and name: ", color, name);
		reset({
			color: "",
			name: ""
		});
	};
	useEffect(() => {
		let Map: google.maps.Map | undefined | null;
		loader.load().then(() => {
			Map = new google.maps.Map(
				document.getElementById("map") as HTMLDivElement,
				{
					center: cairo,
					zoom: 7
				}
			);
			// const marker1 = new google.maps.Marker({
			//     position: cairo,
			//     map: Map
			// });
			// marker1.setMap(Map);
			// const marker2 = new google.maps.Marker({
			//     position: alexandria,
			//     map: Map
			// });
			// marker2.setMap(Map);
			// const marker3 = new google.maps.Marker({
			//     position: portsaid,
			//     map: Map
			// });
			// marker3.setMap(Map);
			// const polygon = new google.maps.Polygon({
			//     paths: [
			//         { lat: 30.033333, lng: 31.233334 },
			//         { lat: 31.205753, lng: 29.924526 },
			//         { lat: 31.2565, lng: 32.2841 }
			//     ],
			//     strokeColor: "blue",
			//     strokeOpacity: 0.8,
			//     strokeWeight: 2
			// });
			const MapDrawer = new google.maps.drawing.DrawingManager({
				drawingMode: google.maps.drawing.OverlayType.POLYGON,
				drawingControl: true,
				drawingControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER,
					drawingModes: [
						google.maps.drawing.OverlayType.CIRCLE,
						google.maps.drawing.OverlayType.POLYGON,
						google.maps.drawing.OverlayType.RECTANGLE
					]
				},
				// polygonOptions: {
				// 	fillColor: color
				// }
			})
			MapDrawer.setMap(Map);
			Map.addListener("click", onMapClick);





			// google.maps.event.addListener(MapDrawer, 'overlaycomplete', function(
			// 	event, overlay
			// ){
			// 	console.log(overlay);

			// 	if(overlay.type == 'polygon'){
			//        console.log('the type is polygon');
			// 	} 
			// 	const paths = event.overlay?.getPaths();
			// 	console.log(paths);
			// })



            const polygons3: google.maps.Polygon[] = [];
			google.maps.event.addListener(MapDrawer, "polygoncomplete", function (
				polygon: google.maps.Polygon
			) {
				console.log("the polygon is completed", polygon);

				const path = polygon.getPath();
				console.log(path);
                polygons3.push(polygon);
				console.log('array of polygons: ', polygons3)

				const area = String(
					google.maps.geometry.spherical.computeArea(path).toFixed(2)
				);
				console.log(area);
				// setArea(area);


				const paths = polygon.getPaths();
				console.log(paths);
				// polygon.setMap(null);
				// MapDrawer.setDrawingMode(null);

				const createPolygon = (paths: google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>) => {
					toggleShow();
					const polygon = new google.maps.Polygon({
						paths: paths,
						fillColor: color,
						strokeColor: 'red',
						map: Map
					})
					// setPolygons([
					// 	...polygons,
					// 	// {
					// 	// 	paths: paths,
					// 	// 	map: Map,
					// 	// 	fillColor: color
					// 	// }
					// 	polygon
					// ])

				}
				createPolygon(paths);
				console.log(polygons);
				// const polygonOptions = MapDrawer.get('polygonOptions');
				// console.log(polygonOptions);
				// if (polygonOptions) {
				// 	polygonOptions.fillColor = color;
				// 	MapDrawer.set('polygonOptions', polygonOptions);
				// }
				// console.log(polygonOptions);





				// MapDrawer.setOptions({
				// 	polygonOptions: {
				// 		fillColor: color,
				// 		strokeColor: color,
				// 		editable: true,
				// 		draggable: true
				// 	}
				// });



				// google.maps.event.addListener(polygon, "click", function (
				//     e: google.maps.MapMouseEvent
				// ) {
				//     const lat = e.latLng?.lat() || 0;
				//     const lng = e.latLng?.lng() || 0;
				//     console.log("click coordinates", lat, lng);
				//     toggleShow();
				//     setInfoPosition({
				//         lat: lat,
				//         lng: lng
				//     });

				//     const MyInfoWindow = new google.maps.InfoWindow({
				//         content: area,
				//         position: infoPosition
				//     });
				//     //   setIsInfoShown(true);

				//     MyInfoWindow.open({
				//         anchor: polygon,
				//         map: Map,
				//         shouldFocus: false
				//     });
				// });
			});
		});
	}, [polygons]);

	const loader = new Loader({
		apiKey: "AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg",
		version: "weekly",
		libraries: ["places", "drawing", "geometry"]
	});

	const onMapClick = (event: google.maps.MapMouseEvent) => {
		const lat = event.latLng?.lat() || 0;
		const lng = event.latLng?.lng() || 0;
		console.log("you clicked the map", lat, lng);
		// setMarkers([
		// 	...markers,
		// 	{
		// 		position: { lat, lng },
		// 		// map: Map,
		// 		name: "this is marker",
		// 		title: "this is markers title"
		// 	}
		// ]);
		// console.log("markers array", markers);
	};

	return (
		<div>
			<div id="map" style={{ width: '100%', height: '600px' }}>

			</div>
			<Modal show={show} onHide={toggleShow}>
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
					<Button variant="secondary" onClick={toggleShow}>
						Close
					</Button>
					<Button variant="primary" onClick={toggleShow}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default InitMap;