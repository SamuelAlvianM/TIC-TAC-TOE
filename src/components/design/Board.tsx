import React from 'react';
import Cell from './Cell';

interface BoardProps {
board: string[][];
onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-48 h-48 bg-violet-200">
        {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
            <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            />
        ))
        )}
    </div>
    );
};

export default Board;
