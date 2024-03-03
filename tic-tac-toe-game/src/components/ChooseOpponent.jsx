import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ChooseOpponent = () => {
    const [opponent, setOpponent] = useState(null);
    const navigate = useNavigate()

    const handleSelectOpponent = (selectedOpponent) => {
        setOpponent(selectedOpponent);
        navigate("/playarea");

    };

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-purple-300'>
            <div className='p-10 bg-purple-800 bg-opacity-50 rounded'>
                <h2 className='mb-4 text-white'>Choose your opponent:</h2>
                <div>
                    <button
                        className={`${opponent === 'bot' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 mr-2 rounded`}
                        onClick={() => handleSelectOpponent('bot')}
                    >
                        Bot
                    </button>
                    <button
                        className={`${opponent === 'friend' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 mr-2 rounded`}
                        onClick={() => handleSelectOpponent('friend')}
                    >
                        Friend
                    </button>
                    <button
                        className={`${opponent === 'invite' ? ' bg-purple-900 text-white' : 'bg-purple-200 text-gray-800'
                            } px-4 py-2 rounded`}
                        onClick={() => handleSelectOpponent('invite')}
                    >
                        Invite Friend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseOpponent;
