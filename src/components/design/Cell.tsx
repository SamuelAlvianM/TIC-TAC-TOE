import React from 'react';

interface CellProps {
value: string;
onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {

    const componentWillStyled = () => {
        if(value === 'X') return 'bg-purple-600 text-white';
        if( value === 'O') return 'bg-yellow-500 text-black';
        return 'bg-stone-600 border-white border-2 rounded-sm';
    }
return (
    <button
        onClick={onClick}
        className={`w-full h-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ease-in-out ${componentWillStyled()}`}
        >
        {value}
        </button>
    
    );
};

export default Cell;
