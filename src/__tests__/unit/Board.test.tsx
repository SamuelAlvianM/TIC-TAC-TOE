import { render, fireEvent } from '@testing-library/react';
import Board from '@/components/design/Board';

describe('Board Component', () => {
  const mockBoard = [
    ['X', '', ''],
    ['', 'O', ''],
    ['', '', '']
  ];
  const mockOnCellClick = jest.fn();

  beforeEach(() => {
    mockOnCellClick.mockClear();
  });

  it('renders board with correct number of cells', () => {
    const { getAllByRole } = render(
      <Board board={mockBoard} onCellClick={mockOnCellClick} />
    );
    const cells = getAllByRole('button');
    expect(cells).toHaveLength(9);
  });

  it('calls onCellClick with correct coordinates when cell is clicked', () => {
    const { getAllByRole } = render(
      <Board board={mockBoard} onCellClick={mockOnCellClick} />
    );
    const cells = getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(mockOnCellClick).toHaveBeenCalledWith(0, 0);
  });
}); 