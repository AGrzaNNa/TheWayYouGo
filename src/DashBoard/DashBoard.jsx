import React, { useContext, useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DashBoard.css';
import { Context } from '../index.js';
import walking from './icons/walking.png';
import driving from './icons/driving.png';
import cycling from './icons/cycling.png';
import local from './icons/local.png';
import adv from './icons/adv.png';
import vacation from './icons/vacation.png';
import Cards from './RecomendationCards';
import { saveWaypoints } from './routingUtils';
import RoutingMachine from './RoutingMachine'; // Import the RoutingMachine component
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {
	Marker,
	Popup,
	MapContainer,
	TileLayer,
	useMapEvents,
} from 'react-leaflet';

function LocationMarker() {
	const [position, setPosition] = useState(null);

	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng);
			map.setView(e.latlng, map.getZoom());
		},
	});

	const LeafIcon = L.Icon.extend({
		options: {
			iconSize: [40, 40],
		},
	});

	const localIcon = new LeafIcon({
		iconUrl: local,
	});

	useEffect(() => {
		map.locate();
	}, [map]);

	return position === null ? null : (
		<Marker position={position} icon={localIcon}>
			<Popup>You are here</Popup>
		</Marker>
	);
}

function ClickableMap({ markers, setMarkers, coordinates, setCoordinates }) {
	const map = useMapEvents({
		click(e) {
			const newMarker = {
				id: markers.length + 1,
				latlng: e.latlng,
			};
			setMarkers([...markers, newMarker]);
			setCoordinates([...coordinates, e.latlng]);
		},
	});

	return null;
}

function Details() {

	return (
		<p className="text">
			Your travel details will appear here after you submit
			your journey
		</p>
	);
}

const Dashboard = () => {
	const [user] = useContext(Context);
	const [markers, setMarkers] = useState([]);
	const [coordinates, setCoordinates] = useState([]);
	const [travelMode, setTravelMode] = useState('');
	const [budget, setBudget] = useState('');
	const [routeWaypoints, setRouteWaypoints] = useState([]); // State for route waypoints

	const handleTravelModeChange = (e) => {
		setTravelMode(e.target.value);
	};

	const handleBudgetChange = (e) => {
		setBudget(e.target.value);
	};

	const handleButtonClick = () => {
		console.log('Button clicked!');
		console.log('Travel Mode:', travelMode);
		console.log('Budget:', budget);
		console.log('Coordinates:', coordinates);

		// Zapisanie wyniku funkcji saveWaypoints do stanu routeWaypoints
		const waypointsText = saveWaypoints(coordinates);
		console.log('Waypoints:', waypointsText);
		setRouteWaypoints(coordinates); // Aktualizacja stanu routeWaypoints
	};

	const deleteMarker = (id, latlng, e) => {
		e.stopPropagation();
		setMarkers(markers.filter((marker) => marker.id !== id));
		setCoordinates(coordinates.filter((coord) => coord !== latlng));
	};

	const advIcon = useMemo(() => {
		const LeafIcon = L.Icon.extend({
			options: {
				iconSize: [40, 40],
			},
		});
		return new LeafIcon({
			iconUrl: adv,
		});
	}, []);

	return (
		<div className="board">
			<div className="grid">
				<div className="g1">
					<MapContainer
						center={[51.505, -0.09]}
						zoom={12}
						style={{ height: '100%', width: '100%' }}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<LocationMarker />
						{markers.map((marker) => (
							<Marker
								icon={advIcon}
								key={marker.id}
								position={marker.latlng}
							>
								<Popup>
									Marker {marker.latlng.toString()} <br />
									<button
										onClick={(e) =>
											deleteMarker(
												marker.id,
												marker.latlng,
												e,
											)
										}
									>
										Delete
									</button>
								</Popup>
							</Marker>
						))}
						<ClickableMap
							markers={markers}
							setMarkers={setMarkers}
							coordinates={coordinates}
							setCoordinates={setCoordinates}
						/>
						{/* Przekazanie aktualnej listy punktów trasy do komponentu RoutingMachine */}
						<RoutingMachine waypoints={routeWaypoints} />
					</MapContainer>
				</div>
				<div className="g2">
					<div style={{ background: 'green', display: 'flex' }}>
						<p style={{ width: '100%', textAlign: 'center' }}>
							Hello :> User ID: {user}
						</p>
					</div>
					<a style={{ textAlign: 'center', marginLeft: '10px' }}>
						Your way of Travel
					</a>
					<form
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginTop: '10px',
						}}
					>
						<label style={{ marginRight: '30px' }}>
							<input
								type="radio"
								name="travelOption"
								value="walking"
								checked={travelMode === 'walking'}
								onChange={handleTravelModeChange}
							/>
							<img
								className="choice"
								src={walking}
								alt="Walking"
								style={{
									width: '50px',
									height: '50px',
									cursor: 'pointer',
								}}
							/>
						</label>
						<label style={{ marginRight: '30px' }}>
							<input
								type="radio"
								name="travelOption"
								value="cycling"
								checked={travelMode === 'cycling'}
								onChange={handleTravelModeChange}
							/>
							<img
								className="choice"
								src={cycling}
								alt="Cycling"
								style={{
									width: '50px',
									height: '50px',
									cursor: 'pointer',
								}}
							/>
						</label>
						<label>
							<input
								type="radio"
								name="travelOption"
								value="driving"
								checked={travelMode === 'driving'}
								onChange={handleTravelModeChange}
							/>
							<img
								className="choice"
								src={driving}
								alt="Driving"
								style={{
									width: '50px',
									height: '50px',
									cursor: 'pointer',
								}}
							/>
						</label>
					</form>
					<div>
						<p style={{ marginLeft: '10px' }}>Your Budget</p>
						<input
							style={{ marginLeft: '10px', marginTop: '-10px' }}
							value={budget}
							onChange={handleBudgetChange}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '20px',
						}}
					>
						<button
							style={{
								marginTop: '10px',
								borderRadius: '20px',
								height: '40px',
								width: '140px',
							}}
							onClick={handleButtonClick}
						>
							Process
						</button>
					</div>
					<p id="travel-time" style={{ textAlign: 'center' }}>
						{/*Total Travel Time: {travelTime} min*/}
					</p>
				</div>
				<div className="g3">
					<Details />
					<img
						src={vacation}
						style={{ width: '150px', height: '150px' }}
					/>
				</div>
				<div className="g4">
					<Cards />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
