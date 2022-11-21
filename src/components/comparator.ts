import { ServerPoly } from "./comp-types";
import * as turf from '@turf/turf';
const turfCompoarator = (myZones: ServerPoly[], newDrawerPolygon: google.maps.Polygon) => {
    const turfMethod = myZones.map((response) => {
      const turfPaths = response.points.map((point) => {
        return [Number(point.lat), Number(point.lng)];
      })
      turfPaths.push(turfPaths[0]);
      const poly1 = turf.polygon([turfPaths]);
      console.log(poly1);
      const newPaths = newDrawerPolygon.getPaths().getArray()[0].getArray().map((point) => {
        return ({ lat: point.lat().toString(), lng: point.lng().toString() })
      })
      const turfPaths2 = newDrawerPolygon.getPaths().getArray()['0'].getArray().map((point) => {
        return [Number(point.lat()), Number(point.lng())];
      })
      turfPaths2.push(turfPaths2[0]);
      const poly2 = turf.polygon([turfPaths2]);
      console.log(poly2);
      const intersection = turf.intersect(poly1, poly2);
      return intersection;
    })
    return turfMethod;
};
export default turfCompoarator;