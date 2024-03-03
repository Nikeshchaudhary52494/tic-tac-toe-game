import React from 'react';
import Square from './Square';

const Board = ({ move, onClick }) => {
    return (
        <div className="grid grid-cols-3 gap-4 rounded-lg p-4 ">
            {move.map((item, index) => (
                <Square
                    key={index}
                    value={item}
                    onClick={() => onClick(index)}
                />
            ))}
        </div>
    );
};

export default Board;
