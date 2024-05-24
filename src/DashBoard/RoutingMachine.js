import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingMachine = ({ waypoints }) => {
	const map = useMap();
	const routingControlRef = useRef(null);

	useEffect(() => {
		if (routingControlRef.current) {
			routingControlRef.current.setWaypoints(waypoints.map(({ lat, lng }) => L.latLng(lat, lng)));
		} else {
			routingControlRef.current = L.Routing.control({
				waypoints: waypoints.map(({ lat, lng }) => L.latLng(lat, lng)),
				lineOptions: {
					styles: [{ color: '#6FA1EC', weight: 4 }]
				},
				waypointMode: 'snap',
				show: false,
				addWaypoints: false,
				routeWhileDragging: true,
				draggableWaypoints: true,
				fitSelectedRoutes: true,
				createMarker: () => null,
			}).addTo(map);
		}
	}, [map, waypoints]);

	return null;
};

export default RoutingMachine;
