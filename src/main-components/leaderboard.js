import '../main-style-sheets/leaderboard.css';
import firebaseApp from './firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import React, {useState, useEffect} from 'react';
import { effects } from '../sound-effects/effects';

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [col, setCol] = useState('level-one');

    const selectLeaderboard = (id) => {
        effects.click.currentTime = 0;
        effects.click.play();
        setCol(id);
    }


    useEffect(() => {
        getPlayerList();
        console.log('jj');
      }, [col]);
    
      const db = getFirestore(firebaseApp);
    
      const getPlayerList = async () => {
        const playerCol = collection(db, `${col}`);
        const colSnapshot = await getDocs(playerCol);
        const playerList = colSnapshot.docs.map(doc => doc.data());
        const sortedList = playerList.sort((a, b) => a.time - b.time);
        setPlayers(sortedList);
      };

      const displayLevelName = () => {
        let level;
        if (col.includes('one')) {
            level = 'Level 1'; 
        } else if (col.includes('two')) {
            level = 'Level 2';
        } else {
            level = 'Level 3';
        }
        return level;
      }

    return (
        <div className="leaderboard-container">
            <header>
                <h1>{displayLevelName()} Leaderboard</h1>
            </header>
            <div className='col-btn-container'>
                <button className='col-btns' id='level-one' onClick={(e) => selectLeaderboard(e.target.id)}>Lvl 1</button>
                <button className='col-btns' id='level-two' onClick={(e) => selectLeaderboard(e.target.id)}>Lvl 2</button>
                <button className='col-btns' id='level-three' onClick={(e) => selectLeaderboard(e.target.id)}>Lvl 3</button>
            </div>
            <div className='leaderboard'>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => {
                            return <tr key={players.indexOf(player) + 1}>
                                <td>{players.indexOf(player) + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.time} {player.time > 1 ? 'seconds' : 'second'}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;