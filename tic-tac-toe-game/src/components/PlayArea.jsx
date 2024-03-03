import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';
import Winner from './Winner';

const PlayArea = () => {
    const [move, setMove] = useState(Array(9).fill(0));
    const player = useRef(1);
    const [winner, setWinner] = useState(null);
    const [bot, setBot] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("player2") === "bot") {
            setBot(true);
        }
    }, []);

    useEffect(() => {
        const checkWinner = () => {
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
                {!winner && (
                    <Board move={move} onClick={handleClick} />
                )}
                {winner && (
                    <Winner winner={winner} handleReplay={handleReplay} />
                )}
            </div>
        </div>
    );
};

export default PlayArea;
