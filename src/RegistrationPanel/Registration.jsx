import './Registration.css';
import mount2 from '../HeroSection/assets/mount2.png';
import logo from './icons/logo.png';
import React, { useState } from 'react';

import { supabase } from './Client';
import { addUserToUsersTable } from './Client';

//MANTINE

import {
	UnstyledButton,
	Checkbox,
	Text,
	Image,
	SimpleGrid,
	Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './ImageCheckboxes.module.css';
import city from './icons/city.png';
import mount from './icons/mountain.png';
import winter from './icons/winter.png';
import sea from './icons/sea.png';
import image from '../HeroSection/assets/image.png';

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
	const [value, handleChange] = useState(defaultChecked);

	const handleCheckboxChange = (newValue) => {
		handleChange(newValue);
		onChange(title, newValue);
	};

	return (
		<UnstyledButton
			{...others}
			onClick={() => handleCheckboxChange(!value)}
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
				tabIndex={-1}
				styles={{ input: { cursor: 'pointer' } }}
			/>
		</UnstyledButton>
	);
}

function Registration() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [preferences, setPreferences] = useState([]);

	const handlePreferenceChange = (index) => {
		setPreferences((prevPreferences) => {
			let updatedPreferences;
			if (prevPreferences.includes(index)) {
				updatedPreferences = prevPreferences.filter(
					(pref) => pref !== index,
				);
			} else {
				updatedPreferences = [...prevPreferences, index];
			}
			console.log('Updated Preferences:', updatedPreferences);
			return updatedPreferences;
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let status = true;
		if (password !== confirmPassword) {
			console.log('Passwords do not match');
			status = false;
		}
		if (!username) {
			console.log('Username is required');
			status = false;
		}
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			console.log('Invalid email format');
			status = false;
		}
		return status;
	};

	const CreateAccount = async (e) => {
		const status = handleFormSubmit(e);
		e.preventDefault();
		console.log('data', status);
		if (status === 'true') {
			const { data, error } = await addUserToUsersTable(
				username,
				email,
				password,
				preferences,
			);
		}
	};

	return (
		<>
			<div className="mother">
				<img src={logo} className="logo" />
				<div className="Container">
					<div id="div1">
						<p className="title1">Input Your Personal Data</p>
					</div>
					<div id="div2">
						<form className="form1" onSubmit={handleFormSubmit}>
							<input
								type="text"
								placeholder="UserName"
								id="SetUserName"
								onChange={(e) => setUsername(e.target.value)}
							/>
							<input
								type="text"
								placeholder="E-mail"
								id="setEmail"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								id="setPassword"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								id="SetConfirmPassword"
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
							<button
								style={{
									marginTop: '20px',
									height: '40px',
									borderRadius: '20px',
									borderColor: 'transparent',
								}}
								type="submit"
								className="submit"
							>
								Check Data
							</button>
						</form>
					</div>
					<div id="div3">
						<img src={image} className="img" />
					</div>
					<div id="div4">
						<p className="title2">Choose your preferences</p>
						<SimpleGrid
							style={{ padding: '10px', background: 'white' }}
							cols={{ base: 1, sm: 2, md: 4 }}
						>
							<ImageCheckbox
								title="Monuments"
								description="Explore the story"
								image={sea}
								onChange={() => handlePreferenceChange(1)}
							/>
							<ImageCheckbox
								title="Restaurants"
								description="Food & Sweet"
								image={city}
								onChange={() => handlePreferenceChange(2)}
							/>
							<ImageCheckbox
								title="Hiking vacation"
								description="Mountains"
								image={mount}
								onChange={() => handlePreferenceChange(3)}
							/>
							<ImageCheckbox
								title="Parks"
								description="Some walk"
								image={winter}
								onChange={() => handlePreferenceChange(4)}
							/>
						</SimpleGrid>
					</div>
					<div id="div7">
						<Link to="/dashboard">
							<button
								onClick={CreateAccount}
								className="submit"
								style={{
									height: '100px',
									width: '320px',
									borderRadius: '20px',
									position: 'sticky',
								}}
							>
								Create Account
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Registration;
