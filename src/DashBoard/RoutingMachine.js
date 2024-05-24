import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingMachine = ({ waypoints }) => {
	const map = useMap();
	const routingControlRef = useRef(null);

	useEffect(() => {
		const options = { profile: "mapbox/walking" };
		if (routingControlRef.current) {
			routingControlRef.current.setWaypoints(waypoints.map(({ lat, lng }) => L.latLng(lat, lng)));
			// Replace the existing router with Mapbox router
			routingControlRef.current.getRouter().options.router = (L.Routing).mapbox(
				"pk.eyJ1IjoiYWdyemFuYTg5ODkiLCJhIjoiY2x3a2pkc25oMGYydDJtcnk0NTk1bWR4MiJ9.WQQWiNq-RyvrB65QceI4AQ", // Replace "YOUR_MAPBOX_API_KEY" with your actual Mapbox API key
				options
			);
		} else {
			routingControlRef.current = L.Routing.control({
				waypoints: waypoints.map(({ lat, lng }) => L.latLng(lat, lng)),
				lineOptions: {
					styles: [{ color: '#6FA1EC', weight: 4 }]
				},
				show: false,
				addWaypoints: false,
				routeWhileDragging: true,
				draggableWaypoints: true,
				fitSelectedRoutes: true,
				createMarker: () => null,
				waypointMode: 'snap',
				// Set the router to Mapbox router
				router: (L.Routing).mapbox(
				"pk.eyJ1IjoiYWdyemFuYTg5ODkiLCJhIjoiY2x3a2pkc25oMGYydDJtcnk0NTk1bWR4MiJ9.WQQWiNq-RyvrB65QceI4AQ", // Replace "YOUR_MAPBOX_API_KEY" with your actual Mapbox API key
				options
			),
				formatter: new L.Routing.Formatter()
			}).addTo(map);
		}
	}, [map, waypoints]);

	return null;
};

export default RoutingMachine;
