// board kosong untuk di isi O sama X
export const initBoard = (): string[][] => {
    return Array(3).fill(null).map( () => Array(3).fill(''));
};