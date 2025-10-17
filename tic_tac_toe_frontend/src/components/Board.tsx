import React from 'react';
import { Square } from './Square';
import { BoardState } from '../types';

export interface BoardProps {
  board: BoardState;
  winningLine: number[] | null;
  disabled?: boolean;
  onPlay: (index: number) => void;
}

// PUBLIC_INTERFACE
export const Board: React.FC<BoardProps> = ({
  board,
  winningLine,
  disabled = false,
  onPlay,
}) => {
  const isWinningIndex = (i: number) => Boolean(winningLine?.includes(i));

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-disabled={disabled}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        padding: '8px',
        background: 'linear-gradient(180deg, rgba(17,24,39,0.02), rgba(17,24,39,0.01))',
        borderRadius: '14px',
        border: '1px solid rgba(17,24,39,0.06)',
      }}
    >
      {board.map((value, idx) => (
        <Square
          key={idx}
          index={idx}
          value={value}
          isWinning={isWinningIndex(idx)}
          disabled={disabled || Boolean(value)}
          onClick={() => onPlay(idx)}
          ariaLabel={`Cell ${idx + 1}, ${value ? value : 'empty'}.`}
        />
      ))}
    </div>
  );
};
