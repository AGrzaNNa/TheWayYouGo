import './Registration.css';
import mount2 from '../HeroSection/assets/mount2.png';
import logo from './icons/logo.png';
import React, {useState, useEffect, useRef} from 'react';


//MANTINE

import {
	UnstyledButton,
	Checkbox,
	Text,
	Image,
	SimpleGrid,
	Button,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './ImageCheckboxes.module.css';
import city from './icons/city.png';
import mount from './icons/mountain.png';
import winter from './icons/winter.png';
import sea from './icons/sea.png';
import image from "../HeroSection/assets/image.png";

export function ImageCheckbox({
								  checked,
								  defaultChecked,
								  onChange,
								  title,
								  description,
								  className,
								  image,
								  ...others
							  }) {
	const [value, handleChange] = useUncontrolled({
		value: checked,
		defaultValue: defaultChecked,
		finalValue: false,
		onChange,
	});

	return (
		<UnstyledButton
			{...others}
			onClick={() => handleChange(!value)}
			data-checked={value || undefined}
			className={classes.button}
		>
			<Image src={image} alt={title} width={50} height={50} />

			<div className={classes.body}>
				<Text c="dimmed" size="xs" lh={1} mb={5}>
					{description}
				</Text>
				<Text fw={600} size="sm" lh={1}>
					{title}
				</Text>
			</div>

			<Checkbox
				checked={value}
				onChange={() => {}}
				tabIndex={-1}
				styles={{ input: { cursor: 'pointer' } }}
			/>
		</UnstyledButton>
	);
}

const mockdata = [
	{ description: 'Sun and sea', title: 'Beach vacation', image: sea },
	{ description: 'Sightseeing', title: 'City trips', image: city },
	{
		description: 'Mountains',
		title: 'Hiking vacation',
		image: mount,
	},
	{
		description: 'Snow and ice',
		title: 'Winter vacation',
		image: winter,
	},
];

export function ImageCheckboxes() {
	const items = mockdata.map((item) => (
		<ImageCheckbox {...item} key={item.title} />
	));
	return (
		<SimpleGrid
			style={{ padding:'10px', background: 'white'}}
			cols={{ base: 1, sm: 2, md: 4 }}
		>
			{items}
		</SimpleGrid>
	);
}

function Registration() {

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			console.log('Passwordss do not match');
		}
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			},
			err => {
				setError(err.message);
			}
		);
	}, []);

	return (
		<>
			<div className="mother">
				<img src={logo} className="logo" />
				<div className="container">
					<div id="div1">
						<p className="title1">Input Your Personal Data</p>
					</div>
					<div id="div2">
						<form className="form1" onSubmit={handleFormSubmit}>
							<input type="text" placeholder="UserName" id="SetUserName" onChange={(e) => setUsername(e.target.value)}/>
							<input type="text" placeholder="E-mail" id="setEmail" onChange={(e) => setEmail(e.target.value)}/>
							<input type="password" placeholder="Password" id="setPassword" onChange={(e) => setPassword(e.target.value)}/>
							<input type="password" placeholder="Confirm Password" id="SetConfirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>
							<button style={{
								marginTop: '20px',
								height: '40px',
								borderRadius: '20px',
								borderColor: "transparent"
							}} type="submit">Check
							</button>
						</form>
					</div>
					<div id="div3">
						<img src={image} style={{width: '510px'}} className="image"/>
					</div>
					<div id="div4">
						<p className="title2">Choose your preferences</p>
						<ImageCheckboxes/>
					</div>
					<div id="div5">
						{latitude && longitude && <p>Location: {latitude}, {longitude}</p>}
						{error && <p>Error: {error}</p>}
					</div>
					<div id="div6">div</div>
					<div id="div7">
						<button className='submit'>SUBMIT</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Registration;
