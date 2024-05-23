import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import icon from './icons/thumbs-up.png';
const data = [
	{
		name: 'user_id',
		img: icon,
		review: 'That was fantastic journey! Really glad to spend that time with me and my friends',
	},
	{
		name: 'user_id',
		img: icon,
		review: 'That was fantastic journey! Really glad to spend that time with me and my friends',
	},
	{
		name: 'user_id',
		img: icon,
		review: 'That was fantastic journey! Really glad to spend that time with me and my friends',
	},
];

function Cards() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
	};
	return (
		<div className="g4" style={{ width: '75%', margin: 'auto' }}>
			<div>
				<Slider {...settings}>
					{data.map((d, index) => (
						<div
							key={index}
							style={{
								backgroundColor: 'white',
								height: '100%', // Zmiana wysokości na 100%
								borderRadius: '1rem',
							}}
						>
							<div
								style={{
									height: '7rem',
									borderRadius: '7px',
									backgroundColor: 'rgba(211,156,55,0.66)',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: '10px',
								}}
							>
								<img
									src={d.img}
									alt=""
									style={{
										height: '6rem',
										width: '6rem',
										borderRadius: '20%',
										maxHeight: '100%', // Dodanie maksymalnej wysokości dla obrazka
									}}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '1rem',
									padding: '1rem',
									height: '220px',
									borderRadius: '7px',
									backgroundColor: 'rgba(255,255,255,0.85)',
								}}
							>
								<p
									style={{
										fontSize: '1.5rem',
										fontWeight: '600',
									}}
								>
									{d.name}
								</p>
								<p
									style={{
										marginTop: '-20px',
										textAlign: 'center',
									}}
								>
									{d.review}
								</p>
								<button
									style={{
										backgroundColor: '#462f6b',
										color: 'white',
										fontSize: '1.125rem',
										padding: '0.5rem 1.5rem',
										borderRadius: '1rem',
									}}
								>
									Let's See
								</button>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}

export default Cards;
