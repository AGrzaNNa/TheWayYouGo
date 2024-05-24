// routingUtils.js

export const saveWaypoints = (waypoints) => {
	const waypointsFormatted = waypoints.map(
		(waypoint) => `L.latLng(${waypoint.lat}, ${waypoint.lng})`,
	);
	return `[\n        ${waypointsFormatted.join(',\n        ')}\n    ]`;
};
