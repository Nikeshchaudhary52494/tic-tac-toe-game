import React, { useState, useEffect, useRef } from 'react';
import Winner from './Winner';

const PlayArea = () => {
    const [move, setMove] = useState(Array(9).fill(0));
    const player = useRef(1);
    const [winner, setWinner] = useState(null);
    const [bot, setBot] = useState(false); // Assuming you have a state for bot

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
        if (localStorage.getItem("player2") === "bot") {
            setBot(true);
        }
    }, []);

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
        if (bot && player.current === 2 && !winner) {
            setTimeout(() => {
                botMove();
            }, 500);
        }
    }, [move, player, winner, bot]);

    const handleClick = (index) => {
        if (move[index] !== 0 || winner) return;
        const newMove = [...move];
        newMove[index] = player.current;
        setMove(newMove);
        player.current = player.current === 1 ? 2 : 1;
    };

    const handleReplay = () => {
        setMove(Array(9).fill(0));
        setWinner(null);
        player.current = 1;
    };

    const botMove = () => {
        // Step 1: Check for immediate winning moves
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (move[a] === 0 && move[b] === 2 && move[c] === 2) {
                handleClick(a);
                return;
            }
            if (move[b] === 0 && move[a] === 2 && move[c] === 2) {
                handleClick(b);
                return;
            }
            if (move[c] === 0 && move[a] === 2 && move[b] === 2) {
                handleClick(c);
                return;
            }
        }

        // Step 2: Check for immediate blocking moves
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (move[a] === 0 && move[b] === 1 && move[c] === 1) {
                handleClick(a);
                return;
            }
            if (move[b] === 0 && move[a] === 1 && move[c] === 1) {
                handleClick(b);
                return;
            }
            if (move[c] === 0 && move[a] === 1 && move[b] === 1) {
                handleClick(c);
                return;
            }
        }

        // Step 3: If no immediate winning or blocking moves, choose a random available move
        const availableMoves = move.reduce((acc, value, index) => {
            if (value === 0) {
                acc.push(index);
            }
            return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        handleClick(availableMoves[randomIndex]);
    };


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
};

export default PlayArea;
