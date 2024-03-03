import React, { useState } from 'react'
import 'firebase/firestore';

const JoinGame = () => {
    const [gameId, setGameId] = useState("");

    const joinGame = async () => {
        const gameSnapshot = await firebase.firestore().collection('games').doc(gameId).get();
        if (gameSnapshot.exists) {
            setGameState(gameSnapshot.data().gameState);
        } else {
            alert('Game not found. Please enter a valid game ID.');
        }
    };

    return (
        <>
            <div className='h-screen flex justify-center items-center bg-purple-300'>
                <div className='bg-purple-800 p-10 rounded bg-opacity-50'>
                    <p className='text-white'>Enter a valid Game id</p>
                    <input
                        className='p-2 rounded  outline-none'
                        type="text"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                    />
                    <input
                        className='bg-green-500 p-2 rounded ml-2 text-white font-bold cursor-pointer'
                        type="submit"
                        value="JOIN"
                        onClick={joinGame}
                    />
                </div>
            </div>
        </>
    )
}

export default JoinGame
