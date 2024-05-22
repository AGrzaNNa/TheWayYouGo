import React, { useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DashBoard.css';
import { useParams } from 'react-router-dom';
import { Context } from '../index.js';
import walking from './icons/walking.png';
import driving from './icons/driving.png';
import cycling from './icons/cycling.png';

const Dashboard = () => {
	const [user] = useContext(Context);
	console.log(user);
	const [location, setLocation] = useState({});

	useEffect(() => {
		const map = L.map('map').setView([51.505, -0.09], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		// Show what you clicked on
		const popup = L.popup();
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent('You clicked the map at ' + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);

		// Getting current location
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });

					// Set map view to current location
					map.setView([latitude, longitude], 13);
					// Add marker at current location
					const marker = L.marker([latitude, longitude]).addTo(map);

					// Add interactive popup on marker click
					marker.bindPopup('<b>You are here</b><br>').openPopup();
				},
				(error) => {
					console.error('Error getting user location:', error);
				},
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}

		return () => {
			map.remove();
		};
	}, []);

	return (
		<>
			<div className="board">
				<div className="grid">
					<div className="g1">
						<div
							id="map"
							style={{ height: '100%', width: '100%' }}
						></div>
					</div>
					<div className="g2">
						<div
							style={{
								background: 'green',
								display: 'flex',
							}}
						>
							<p style={{ width: '100%', textAlign: 'center' }}>
								Hello :> User ID: {user} {/* Assuming user has an id property */}
							</p>
						</div>
						<a style={{ textAlign: 'center' }}>
							Your way of Travel
						</a>
						<form
							style={{
								display: 'flex',
								flexDirection: 'row',
								marginLeft: '25%',
							}}
						>
							<label style={{ marginRight: '30px' }}>
								<input
									type="radio"
									name="travelOption"
									value="1"
								/>
								<img
									src={walking}
									alt="Walking"
									style={{ width: '50px', height: '50px' }}
								/>
							</label>
							<label style={{ marginRight: '30px' }}>
								<input
									type="radio"
									name="travelOption"
									value="2"
								/>
								<img
									src={cycling}
									alt="Cycling"
									style={{ width: '50px', height: '50px' }}
								/>
							</label>
							<label>
								<input
									type="radio"
									name="travelOption"
									value="3"
								/>
								<img
									src={driving}
									alt="Driving"
									style={{ width: '50px', height: '50px' }}
								/>
							</label>
						</form>
						<div>
							<p>Your Budget</p>
							<input />
						</div>
					</div>
					<div className="g3">div3</div>
					<div className="g4">div4</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
