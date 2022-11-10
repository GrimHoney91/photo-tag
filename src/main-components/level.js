import '../main-style-sheets/level.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebaseApp from './firebase';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore/lite';

import first from '../images/first.jpg';
import second from '../images/second.jpg';
import third from '../images/third.jpg';

import pakkun from '../images/dogs/dog-1.png';
import fireDog from '../images/dogs/dog-2.png';
import snowball from '../images/dogs/dog-3.png';

import papaSmurf from '../images/level-two/papa-smurf-icon.png';
import jawa from '../images/level-two/jawa.png';
import babyGroot from '../images/level-two/baby-groot.webp';

import blombo from '../images/level-three/blombo.webp';
import beemo from '../images/level-three/beemo.webp';
import forestWizard from '../images/level-three/forest-wizard.webp';

import homeIcon from '../images/house.png';
import replayIcon from '../images/replay.png';

import { effects } from '../sound-effects/effects';

const levels = [
    {image: first, difficulty: 'Easy', id: 'level-one', name: 'Level 1', items: [{id: 'item-1-1', img: pakkun, name: 'Pakkun'}, {id: 'item-1-2', img: fireDog, name: 'This is fine'}, {id: 'item-1-3', img: snowball, name: 'Snowball'}]},
    {image: second, difficulty: 'Medium', id: 'level-two', name: 'Level 2', items: [{id: 'item-2-1', img: papaSmurf, name: 'Papa Smurf'}, {id: 'item-2-2', img: jawa, name: 'Jawa'}, {id: 'item-2-3', img: babyGroot, name: 'Baby Groot'}]},
    {image: third, difficulty: 'Hard', id: 'level-three', name : 'Level 3', items: [{id: 'item-3-1', img: blombo, name: 'Blombo'}, {id: 'item-3-2', img: beemo, name: 'Beemo'}, {id: 'item-3-3', img: forestWizard, name: 'Forest Wizard'}]}
];

const Level = () => {

    const [level, setLevel] = useState({});
    let params = useParams();

    useEffect(() => {
        getLevel(params);
        effects.timer.play();
        effects.timer.volume = 0.6;
        effects.timer.loop = true;

        return () => effects.timer.pause();
    }, []);

    const getLevel = (params) => {
        levels.map((level) => {
            if (level.id === params.id) {
                setLevel(level);
                console.log(level);
            }
        })
    }


    const [markedTargets, setMarkedTargets] = useState([]);

    const validateTarget = (id) => {
        let exists = false;
        markedTargets.map((target) => {
            if (target === id) {
                exists = true;
            }
        });

        if (!exists) {
            setMarkedTargets([...markedTargets, id]);
            document.getElementById(id).parentElement.style.opacity = '0.2';
            effects.charSelect.currentTime = 0;
            effects.charSelect.volume = 0.6;
            effects.charSelect.play();
        }
      
    }

    const resetLevel = async () => {
        effects.click.play();
        setTimeout(() => {
            effects.timer.play();
        }, 500);
        window.scrollTo(0, 0);
        if (highScore) {
            const nameInput = document.getElementById('name');
            if (nameInput.value !== '') {

                const db = getFirestore(firebaseApp);
                const playerCol = collection(db, level.id);
                const playerColSnapshot = await getDocs(playerCol);
                const playerList = playerColSnapshot.docs.map(doc => doc.data());

                if (playerList.length === 10) {
                    let num = 0;
                    let longestId;
                    const IdList = playerColSnapshot.docs.map((doc) => {
                        let data = doc.data();
                        if (count < data.time && data.time > num) {
                            num = data.time;
                            longestId = doc.id;
                        }
                        return doc; 
                    });
                    console.log(IdList);
                    await deleteDoc(doc(db, level.id, longestId));
                }

                const docRef = await addDoc(collection(db, level.id), {
                    name: nameInput.value,
                    time: count
                });
                
                
                /////check if last gets deleted
            }
        }
        setHighScore(false);
        setMarkedTargets([]);
        setCount(0);
        document.querySelectorAll('.key-items').forEach((item) => {
            item.style.opacity = '1';
        });
    }

    const goHome = async () => {
        effects.click.play();
        if (highScore) {
            const nameInput = document.getElementById('name');
            if (nameInput.value !== '') {
                const db = getFirestore(firebaseApp);
                const docRef = await addDoc(collection(db, level.id), {
                    name: nameInput.value,
                    time: count
                });
            }
        }

        document.getElementById('home-link').click();
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer = null;
        
        if (markedTargets.length < 3) {
            timer = setInterval(() => {
                setCount(count => count + 1);
            }, 1000);
            console.log('hello');
        } else if (markedTargets.length === 3) {
            clearInterval(timer);
            effects.timer.pause();
            setTimeout(() => {
                effects.success.play();
            }, 100);
        }

        return () => clearInterval(timer);

    }, [markedTargets]);

    const [highScore, setHighScore] = useState(false);

    useEffect(() => {
        if (markedTargets.length === 3) {
            compareTimes();
        }
    }, [markedTargets]);

    const compareTimes = async () => {
        let entry = false;
        const db = getFirestore(firebaseApp);
        const playerCol = collection(db, level.id);
        const playerColSnapshot = await getDocs(playerCol);
        const playerList = playerColSnapshot.docs.map(doc => doc.data());
        
        if (playerList.length === 10) {
            playerList.map((player) => {
                if (count < player.time) {
                    entry = true;
                }
                return player;
            });
        } else {
            entry = true;
        }

        if (entry) {
            setHighScore(true);
            console.log('baby');
        }
    }

    const addMargin = {
        marginTop: '4rem'
    }

    return (
        <div className="level-container">
            {markedTargets.length === 3 ? 
            <div className='result-container' id='results'>
                <h3>Finished in {count} {count > 1 ? 'seconds' : 'second'}</h3>
                {highScore ?
                <div className='high-score-container'>
                    <h4>You got a high score!</h4>
                    <span className='input-container'>
                        <label htmlFor='name-input' className='name-label'>Enter Your Name (optional)</label>
                        <input id='name' className='name-input'></input>
                    </span>
                </div> : null}
                <div className='result-btn-container' style={highScore ? null : addMargin}>
                    <button className='result-btns' onClick={() => resetLevel()}>
                        <img className='replay-icon' src={replayIcon} alt='Replay icon'/>
                    </button>
                    <button className='result-btns'>
                        <Link id='home-link' to='/'/>
                        <img className='home-icon' src={homeIcon} alt='Home icon' onClick={() => goHome()}/>
                    </button>
                </div>
            </div> : null}
            <header className='level-header'>
                <h2 className='timer header-item'>Time: {count}s</h2>
                <h1 className='level-name header-item'>{level.name}</h1>
                <ul className='key header-item'>
                    {level.items ? level.items.map((item) => {
                        return <li key={item.name} className='key-items'>
                            <img src={item.img} alt={item.name} id={item.id} className='key-images'/>
                            <span className='key-names'>{item.name}</span>
                        </li>
                    }) : null}
                </ul>
            </header>
            <div className='image-container'>
                <img className='level-image' src={level.image} alt={level.name} />
                {level.items ? level.items.map((item) => {
                    return <div key={item.id} className={`items ${item.id}`} onClick={() => validateTarget(item.id)}></div>
                }) : null}
            </div>
        </div>
    );
}

export default Level;