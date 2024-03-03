import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';

const ChooseOpponent = () => {
    const [opponent, setOpponent] = useState(null);
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate()

    const handleSelectOpponent = (selectedOpponent) => {
        setOpponent(selectedOpponent);
        navigate("/playarea");
        localStorage.setItem("player2", selectedOpponent);
    };
    const createNewGame = async () => {
        const newGameId = uuidv4();
        await firebase.firestore().collection('games').doc(newGameId).set({
            gameState: [],
        });
        setGameId(newGameId);
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-purple-300'>
            <div className='p-10 bg-purple-800 bg-opacity-50 rounded'>
                <h2 className='mb-4 text-white'>Choose your opponent:</h2>
                <div>
                    <button
                        className={`cursor-pointer ${opponent === 'bot' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 mr-2 rounded`}
                        onClick={() => handleSelectOpponent('bot')}
                    >
                        Bot
                    </button>
                    <button
                        className={`cursor-pointer ${opponent === 'friend' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 mr-2 rounded`}
                        onClick={() => handleSelectOpponent('friend')}
                    >
                        Friend
                    </button>
                    <button
                        className={`cursor-not-allowed ${opponent === 'invite' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 rounded`}
                        onClick={() => {
                            handleSelectOpponent('invite');
                            createNewGame();
                            navigate("/shareid");
                        }}
                    >
                        Invite Friend
                    </button>
                </div>
                <button className='bg-purple-200 w-full rounded mt-2 py-2'
                    onClick={() => navigate("/join")}
                >
                    Join Game
                </button>
            </div>

        </div>
    );
};

export default ChooseOpponent;
