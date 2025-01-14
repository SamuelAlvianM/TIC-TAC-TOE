
export const makeMove = (board: string[][], row: number, coll: number, player: string): string[][] => {
    if(board[row][coll] !== '') {
        throw new Error(`Kotak baris ke-${row} & kolom ke-${coll} sudah Terisi, pilih kotak lain!!!`);
    }

    const updateBoard = board.map((rows, rowIndex) =>
        rows.map((cell, j) => (rowIndex === row && j === coll ? player : cell))
    );
    return updateBoard;
};

