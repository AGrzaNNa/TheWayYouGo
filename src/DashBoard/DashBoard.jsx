import React, { useContext, useEffect, useState } from 'react';
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
import logo from '../RegistrationPanel/icons/logo.png';
import Cards from './Carddata';

const Dashboard = () => {
	const [user] = useContext(Context);
	const [location, setLocation] = useState(null);
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		const map = L.map('map').setView([51.505, -0.09], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		var LeafIcon = L.Icon.extend({
			options: {
				iconSize: [38, 38],
				shadowSize: [50, 64],
			},
		});
		var locali = new LeafIcon({
			iconUrl: local,
		});

		var LeafIcon2 = L.Icon.extend({
			options: {
				iconSize: [38, 38],
				shadowSize: [50, 64],
			},
		});
		var advi = new LeafIcon2({
			iconUrl: adv,
		});

		function onMapClick(e) {
			const newMarker = L.marker(e.latlng, { icon: advi }).addTo(map);
			setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

			newMarker.bindPopup(`
                <b>Coordinates:</b> ${e.latlng.toString()}<br>
                <button id="delete-marker">Usuń</button>
            `);

			newMarker.on('popupopen', function () {
				document
					.getElementById('delete-marker')
					.addEventListener('click', () => {
						map.removeLayer(newMarker);
						setMarkers((prevMarkers) =>
							prevMarkers.filter(
								(marker) => marker !== newMarker,
							),
						);
					});
			});
		}
		map.on('click', onMapClick);

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });

					map.setView([latitude, longitude], 13);

					const marker = L.marker([latitude, longitude], {
						icon: locali,
					}).addTo(map);

					marker.bindPopup('<b>You are here</b><br>').openPopup();
				},
				(error) => {
					console.error('Error getting user location:', error);
				},
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const handleButtonClick = () => {
		console.log('Button clicked!');
	};

	return (
		<div className="board">
			<div className="grid">
				<div className="g1">
					<div
						id="map"
						style={{ height: '100%', width: '100%' }}
					></div>
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
							<input type="radio" name="travelOption" value="1" />
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
							<input type="radio" name="travelOption" value="2" />
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
							<input type="radio" name="travelOption" value="3" />
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
						<button onClick={handleButtonClick}>Process</button>
					</div>
				</div>
				<div className="g3">
					<p className="text">
						Your travel details will appear Here after submit your
						journay
					</p>
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
