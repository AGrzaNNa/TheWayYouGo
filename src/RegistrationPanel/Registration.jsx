import './Registration.css';
import mount2 from '../HeroSection/assets/mount2.png';
import logo from './logo.png';

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
// import icons from './icons';
import classes from './ImageCheckboxes.module.css';
import city from './icons/city.png';
import mount from './icons/mountain.png';
import winter from './icons/winter.png';
import sea from './icons/sea.png';

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
			<Image src={image} alt={title} width={40} height={40} />

			<div className={classes.body}>
				<Text c="dimmed" size="xs" lh={1} mb={5}>
					{description}
				</Text>
				<Text fw={500} size="sm" lh={1}>
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
			style={{ marginLeft: '52px' }}
			cols={{ base: 1, sm: 2, md: 4 }}
		>
			{items}
		</SimpleGrid>
	);
}

function Registration() {
	return (
		<>
			<div className="mother">
				{/*<img src={mount2} className="mount2" />*/}
				<img src={logo} className="logo" />
				<div className="Panel">
					<div id="div1">
						<p className="title1">Input Your Personal Data</p>
					</div>
					<div id="div2">
						<form className="form1">
							<input type="text" placeholder="UserName" />
							<input type="text" placeholder="E-mail" />
							<input type="password" placeholder="Password" />
							<input
								type="password"
								placeholder="Confirm Password"
							/>
						</form>
					</div>
					<div id="div3"></div>
					<div id="div4">
						<p className="title2">Choose your preferences</p>
						<ImageCheckboxes />
					</div>
					<div id="div5">div</div>
					<div id="div6">div</div>
					<div id="div7">
						<button>SUBMIT</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Registration;
