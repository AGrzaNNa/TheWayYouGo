import './Registration.css';
import mount2 from "../HeroSection/assets/mount2.png";
import logo from './logo.png';
import bush2 from '../HeroSection/assets/bush2.png';

function Registration() {
    return (
        <>
            <div className='mother'>
                <img src={mount2} className='mount2'/>
                <img src={logo} className='logo'/>
                <div className='Panel'>
                    <div id="div1">
                        <p className='title1'>Input Your Personal Data</p>
                    </div>
                    <div id="div2">
                        <form className='form1'>
                            <input type='text' placeholder='UserName'/>
                            <input type='text' placeholder='E-mail'/>
                            <input type='password' placeholder='Password'/>
                            <input type='password' placeholder='Confirm Password'/>
                        </form>
                    </div>
                    <div id="div3">div3</div>
                </div>
            </div>
        </>
    );
}

export default Registration;