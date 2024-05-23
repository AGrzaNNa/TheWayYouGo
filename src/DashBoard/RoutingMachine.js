import React from 'react';
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

export const createRoutineMachineLayer = (props) => {
	console.log('Waypoints in RoutingMachine:', props);
	return L.Routing.control({
		waypoints: [
			L.latLng(50.30813287769177, 18.88072967514745),
			L.latLng(50.30681645463745, 18.921928405616203),
		],
	});
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
