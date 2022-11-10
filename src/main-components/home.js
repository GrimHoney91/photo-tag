import React, {useState, useEffect} from 'react';
import '../main-style-sheets/home.css';
import LevelSlider from './home-components/level-slider';
import { effects } from '../sound-effects/effects';


const Home = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
    effects.unlock.currentTime = 0;
    effects.unlock.play();
  }

  const decrementCounter = () => {
    setCounter(counter - 1);
    effects.unlock.currentTime = 0;
    effects.unlock.play();
  }
  
  return (
    <div className='home-container'>
      <div className='slider-btn left-slider-btn' onClick={() => counter > 0 ? decrementCounter() : null}>
        <span className='left-symbol symbols'>&#9001;</span>
      </div>
      <LevelSlider counter={counter}/>
      <div className='slider-btn right-slider-btn' onClick={() => counter < 2 ? incrementCounter() : null}>
        <span className='right-symbol symbols'>&#9002;</span>
      </div>
    </div>
  );
}

export default Home;
