import React from 'react';

const Square = ({ value, onClick }) => {
    return (
        <button className="h-20 bg-white aspect-square flex items-center justify-center rounded-lg "
            onClick={onClick}>
            <span
                className={`font-bold text-3xl ${value === 0 ? null : value === 1 ? `text-green-500` : "text-red-500"}`}
            >
                {value === 0 ? null : value === 1 ? "X" : "O"}
            </span>
        </button>
    );
};

export default Square;
