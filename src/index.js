import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hero from './HeroSection/HeroSection';
import Registration from './RegistrationPanel/Registration';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Dashboard from './DashBoard/DashBoard';
import LogIn from './LogInPanel/LogIn';

export const Context = createContext();

function Index() {
	const [user, setUser] = useState(null);

	return (
		<Context.Provider value={[user, setUser]}>
			<MantineProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route
							path="/registration"
							element={<Registration />}
						/>
						<Route path="/logIn" element={<LogIn />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</Router>
			</MantineProvider>
		</Context.Provider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
