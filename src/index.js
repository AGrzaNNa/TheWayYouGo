import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hero from './HeroSection/HeroSection';
import Registration from './RegistrationPanel/Registration';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Dashboard from './DashBoard/DashBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<MantineProvider>
		<Router>
			<Routes>
				<Route path="/" exact element={<Hero />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	</MantineProvider>,
);

reportWebVitals();
