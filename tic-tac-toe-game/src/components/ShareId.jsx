import React, { useState } from 'react';

const ShareId = () => {
    const [gameId, setGameId] = useState('');
    const copyToClipboard = () => {
        navigator.clipboard.writeText(gameId)
            .then(() => {
                alert('Game ID copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy:', error);
            });
    };

    return (
        <div className="h-screen flex justify-center items-center bg-purple-300">
            <div className="bg-purple-800 p-10 rounded bg-opacity-50">
                <p className="text-white">Your Game ID:</p>
                <div className="flex items-center">
                    <input
                        className="p-2 rounded outline-none bg-gray-300 mr-2"
                        type="text"
                        value={gameId}
                        readOnly
                    />
                    <button
                        className="bg-green-500 p-2 rounded text-white font-bold cursor-pointer"
                        onClick={copyToClipboard}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareId;

