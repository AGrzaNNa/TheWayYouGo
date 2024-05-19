import './LogIn.css';
import logo from '../RegistrationPanel/icons/logo.png';

import image from '../HeroSection/assets/image.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LogIn() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleFormSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="mother">
				<img src={logo} className="logoLogin" />
				<div className="Container">
					<div id="div1">
						<p className="title1">Welcome Back Traveler !</p>
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
							<Link to="/dashboard">
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
							</Link>
						</form>
					</div>
					<div id="div3">
						<img
							src={image}
							style={{ width: '510px' }}
							className="image"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default LogIn;
