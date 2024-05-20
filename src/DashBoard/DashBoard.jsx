import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './DashBoard.css';

const Dashboard = () => {
	const [location, setLocation] = useState({});

	useEffect(() => {
		const map = L.map('map').setView([51.505, -0.09], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		//show what u clicked on
		const popup = L.popup();
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent('You clicked the map at ' + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);

		// Pobieranie aktualnej lokalizacji
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });

					// Ustawianie widoku mapy na aktualnej lokalizacji
					map.setView([latitude, longitude], 13);
					// Dodanie znacznika na aktualnej lokalizacji
					const marker = L.marker([latitude, longitude]).addTo(map);

					// Dodanie interaktywnego okna po kliknięciu na markerze
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
					<div className="g2">div2</div>
					<div className="g3">div3</div>
					<div className="g4">div4</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
