import React, { useState, useEffect } from 'react';
import Winner from './Winner';

const PlayArea = () => {
    const [move, setMove] = useState(Array(9).fill(0));
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    useEffect(() => {
        const checkWinner = () => {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (move[a] && move[a] === move[b] && move[a] === move[c]) {
                    setWinner(move[a]);
                    return;
                }
            }
            if (move.every(item => item !== 0)) {
                setWinner('draw');
            }
        };
        checkWinner();
    }, [move]);

    const handleClick = (index) => {
        if (move[index] !== 0 || winner) return;
        const newMove = [...move];
        newMove[index] = player;
        setMove(newMove);
        setPlayer(player === 1 ? 2 : 1);
    };

    const handleReplay = () => {
        setMove(Array(9).fill(0));
        setWinner(null);
        setPlayer(1)
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-800 to-pink-300">
            <div className='flex flex-col'>
                {
                    !winner && (
                        <div className="grid grid-cols-3 gap-4 rounded-lg p-4 ">
                            {move.map((item, index) => (
                                <div
                                    className={`h-20 bg-white aspect-square flex items-center justify-center rounded-lg `}
                                    key={index}
                                    onClick={() => handleClick(index)}
                                >
                                    <span className={`font-bold text-3xl ${item === 0 ? null : item === 1 ? `text-green-500` : "text-red-500"}`}> {item === 0 ? null : item === 1 ? "X" : "O"}</span>
                                </div>
                            ))}
                        </div>
                    )
                }
                {winner && (
                    <Winner winner={winner} handleReplay={handleReplay} />
                )}

            </div>
        </div>
    );
}

export default PlayArea;
