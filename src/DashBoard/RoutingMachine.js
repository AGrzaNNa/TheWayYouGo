import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingMachine = ({ waypoints, travelMode }) => {

	const map = useMap();
	const routingControlRef = useRef(null);

		if (routingControlRef.current) {
			// Remove the existing routing control from the map
			map.removeControl(routingControlRef.current);
		}
		// Create a new instance of the routing control
		routingControlRef.current = L.Routing.control({
			waypoints: waypoints.map(({ lat, lng }) => L.latLng(lat, lng)),
			lineOptions: {
				styles: [{ color: '#6FA1EC', weight: 4 }],
			},
			show: false,
			addWaypoints: false,
			routeWhileDragging: true,
			draggableWaypoints: true,
			fitSelectedRoutes: true,
			createMarker: () => null,
			waypointMode: 'snap',
			router: L.Routing.mapbox(
				'pk.eyJ1IjoiYWdyemFuYTg5ODkiLCJhIjoiY2x3a2pkc25oMGYydDJtcnk0NTk1bWR4MiJ9.WQQWiNq-RyvrB65QceI4AQ',
				{ profile: 'mapbox/' + travelMode }
			),
			formatter: new L.Routing.Formatter(),
		}).addTo(map);

		return () => {
			if (routingControlRef.current) {
				map.removeControl(routingControlRef.current);
			}
		};
};

export default RoutingMachine;
