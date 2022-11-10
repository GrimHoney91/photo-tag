import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { effects } from '../../sound-effects/effects';

import first from '../../images/first.jpg';
import second from '../../images/second.jpg';
import third from '../../images/third.jpg';
const levels = [
    {image: first, difficulty: 'Easy', id: 'level-one', name: 'level one', items: ['item-1-1', 'item-1-2', 'item-1-3']},
    {image: second, difficulty: 'Medium', id: 'level-two', name: 'level two', items: ['item-2-1', 'item-2-2', 'item-2-3']},
    {image: third, difficulty: 'Hard', id: 'level-three', name : 'level three', items: ['item-3-1', 'item-3-2', 'item-3-3']}
];

const LevelSlider = ({counter}) => {

    useEffect(() => {
        const slider = document.querySelector(`.slider`);
    
        slider.style.transform = `translateX(-${35 * counter}vw)`;
    
      }, [counter]);

    const levelPage = (id) => {
        const link = document.getElementById(`${id}`);
        effects.select.play();
        setTimeout(() => {
            link.click();
        }, 1250);
    };

    const displayLevels = () => {
        const containers = levels.map((level) => {
            return <div className='display-container' key={`level${levels.indexOf(level) + 1}`}>
                <div className='display-description'>
                    <h1>Level {levels.indexOf(level) + 1}</h1>
                    <span>{`(${level.difficulty})`}</span>
                </div>
                <div className='display-image' id={`level${levels.indexOf(level) + 1}`}>
                    <Link id={level.id} className='level-links' to={`/${level.id}`}></Link>
                </div>
                <button className='play-btn' onClick={() => levelPage(level.id)}>Start</button>
            </div>
        })
        return containers;
    }


    return (
        <div className="slider-container">
            <div className="slider" >
               {displayLevels()}
            </div>
        </div>
    );
};

export default LevelSlider;