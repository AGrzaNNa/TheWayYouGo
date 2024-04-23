import './HeroSection.css';
import image from './assets/image.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.png';
import mount1 from './assets/mount1.png';
import mount2 from './assets/mount2.png';
import bush1 from './assets/bush1.png';
import bush2 from './assets/bush2.png';
import { useState } from "react";

function Hero() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section className='home'>
                <img src={mount2} className='mount2'/>
                <img src={mount1} className='mount1'/>
                <h1 className='title'>The Way You Go</h1>
                <img src={bush1} className='bush2'/>
                <img src={bush2} className='bush1'/>
            </section>
            <div className="section">
                <div className="container">
                    <div className="items">
                        <h2>Encourage You Journay</h2>
                        <p className="description">
                            "Embark on Your Journey of Self-Discovery! Explore new horizons,
                            gain insights, and grow every step of the way. Join our community
                            today and unlock your full potential. Together, let's navigate
                            this exciting path towards personal growth and success!"
                        </p>
                        <img src={image} className="image" alt="React Logo"/>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="items">
                        <img src={image2} className="image" alt="React Logo"/>
                        <h2 className='special'>Plan Your Moves</h2>
                        <p className="description">
                            "Discover Your Ideal Adventure: Craft Your Perfect
                            Journey with an Interactive Map Featuring Specialized Filters.
                            Explore the world your way, whether You want thanks to our interactive map planner!
                        </p>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="items">
                        <h2>Share With Others</h2>
                        <p className="description">
                            "Post Your toughts give star to places u been share your experience with others.
                            Show what u got Dont let it slide without any feelings!"
                        </p>
                        <img src={image3} className="image" alt="React Logo"/>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="d">
                        <img src={image4} className="image" alt="React Logo"/>
                        <p className="des">
                            Start planning today and turn your travel dreams into unforgettable experiences!"
                        </p>
                        <button>Join US !</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
