import LatLon from 'geodesy/latlon-spherical';

export const getDistance = (origin, position) => {
  const originLatLng = new LatLon(
    origin.latitude,
    origin.longitude
  );

  return originLatLng.distanceTo(
    new LatLon(Number(position.latitude), Number(position.longitude))
  );

}
