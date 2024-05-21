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
import LogIn from './LogInPanel/LogIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<MantineProvider>
		<Router>
			<Routes>
				<Route path="/" exact element={<Hero />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/logIn" element={<LogIn />} />
				<Route path="/dashboard/:userId" element={<Dashboard />} />
			</Routes>
		</Router>
	</MantineProvider>,
);

reportWebVitals();
