import './LogIn.css';
import logo from '../RegistrationPanel/icons/logo.png';
import image from '../HeroSection/assets/image.png';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUserNameFromTable, supabase } from './client';
import { Context } from '../index';


function LogIn() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [, setUser] = useContext(Context);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const value = await LoginUserNameFromTable(username, email, password);
		if (value) {
			console.log('User found. User ID:', value);
			setUser(value);
			navigate('/dashboard')
		} else {
			console.log('User not found or error occurred.');
		}
	};
	return (
		<>
			<div className="Mother">
				<img src={logo} className="logoLogin" alt="logo" />
				<div className="container">
					<div className="div1">
						<p className="title1">Welcome Back Traveler !</p>
					</div>
					<div className="div2">
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
								Log In
							</button>
						</form>
					</div>
					<div className="div3">
						<img
							src={image}
							alt="image"
							style={{ width: '510px', marginBottom: '20px' }}
							className="img2"
						/>
					</div>
				</div>
			</div>
			{error && <p>{error}</p>}
		</>
	);
}

export default LogIn;
