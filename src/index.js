import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hero from './HeroSection/HeroSection';
import Registration from './RegistrationPanel/Registration';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider>
    <Router>
        <Routes>
            <Route path="/hero" exact element={<Hero />} />
            <Route path="/" element={<Registration />} />
        </Routes>
    </Router>
    </MantineProvider>
);

reportWebVitals();
