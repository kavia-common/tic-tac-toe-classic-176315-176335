import React from 'react';
import { Cell } from '../types';

export interface SquareProps {
  index: number;
  value: Cell;
  isWinning?: boolean;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

// PUBLIC_INTERFACE
export const Square: React.FC<SquareProps> = ({
  value,
  isWinning = false,
  disabled = false,
  onClick,
  ariaLabel,
}) => {
  const bg = isWinning ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.9)';
  const border = isWinning ? '1px solid rgba(245,158,11,0.6)' : '1px solid rgba(17,24,39,0.08)';
  const color = value === 'X' ? 'var(--primary)' : value === 'O' ? '#0f766e' : 'var(--text)';

  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        height: 100,
        minHeight: 88,
        borderRadius: 12,
        border,
        background: bg,
        boxShadow: 'var(--shadow-sm)',
        display: 'grid',
        placeItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 120ms ease, box-shadow 200ms ease, background 200ms ease',
      }}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(1px)';
        }
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: 1,
          color,
          textShadow: isWinning ? '0 2px 8px rgba(245,158,11,0.35)' : 'none',
          transition: 'color 200ms ease',
        }}
      >
        {value ?? ''}
      </span>
    </button>
  );
};
