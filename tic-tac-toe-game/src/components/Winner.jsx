import React from 'react';

const Winner = ({ winner, handleReplay }) => {
    return (
        <div className='bg-white p-10 flex flex-col justify-center rounded-md'>
            <p>{winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}</p>
            <button className='bg-green-400 px-4 mt-4 py-2 rounded' onClick={handleReplay}>
                Replay
            </button>
        </div>
    );
};

export default Winner;
