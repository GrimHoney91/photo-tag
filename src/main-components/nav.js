import { Link } from "react-router-dom";
import house from '../images/red-house.png';
import leaderboard from '../images/blue-leaderboard.png';
import { effects } from "../sound-effects/effects";

const Nav = () => {

    const nav = document.querySelector('nav');

    const selectSound = () => {
        effects.click.currentTime = 0;
        effects.click.play();
    }

    return (
        <nav className="main-nav">
            <ul>
                <Link className="nav-links" to='/' onClick={() => selectSound()}>
                    <li>
                        <img className="nav-icons" src={house} alt='white home navigation icon'/>
                    </li>
                </Link>
                <Link className="nav-links" to='/leaderboard'>
                    <li>
                        <img className="nav-icons" src={leaderboard} alt='white leaderboard navigation icon' onClick={() => selectSound()}/>
                    </li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;

// {nav.classList.contains('main-nav') ?  <button className="close-nav">&#10005;</button> : null}