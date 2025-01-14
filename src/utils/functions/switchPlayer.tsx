export const switchPlayer = (currentPlayer: string) => {
    return currentPlayer === 'X' ? 'O' : 'X';
}