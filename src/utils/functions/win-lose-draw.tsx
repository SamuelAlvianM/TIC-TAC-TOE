
export const winningSituation = 
    (board: string[][]) : {winner: string | null; isDraw: boolean} => {
    const winningLines = [
        // menang garis horizontal
        [ [0,0], [0,1], [0,2] ],
        [ [1,0], [1,1], [1,2] ],
        [ [2,0], [2,1], [2,2] ],

        // menang garis vertical
        [ [0,0], [1,0], [2,0] ],
        [ [0,1], [1,1], [2,1] ],
        [ [0,2], [1,2], [2,2] ],

        // menang garis miring
        [ [0,0], [1,1], [2,2] ],
        [ [0,2], [1,1], [2,0] ],
    ];

    // cek dengan iterasi biar bisa fix bener kalau itu menang
    for (const line of winningLines) {
        const [point_a, point_b, point_c] = line;

        if (
            board[point_a[0]][point_a[1]] && 
            board[point_a[0]][point_a[1]] === board[point_b[0]][point_b[1]] &&
            board[point_a[0]][point_a[1]] === board[point_c[0]][point_c[1]]
        ) {
            return { winner: board[point_a[0]][point_a[1]], isDraw: false };
        }
    }

    const isDraw = board.flat().every((cell) => cell !== '');
    return { winner: null, isDraw};
};