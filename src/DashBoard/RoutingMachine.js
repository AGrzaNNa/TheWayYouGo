import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = (props) => {
	const instance = L.Routing.control({
		waypoints: [
			L.latLng(50.307938, 18.874207),
			L.latLng(50.310571, 18.908882),
		],
	});
	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
