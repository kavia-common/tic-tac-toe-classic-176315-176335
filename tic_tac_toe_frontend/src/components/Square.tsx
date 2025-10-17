import React from 'react';
import { Cell } from '../types';
import KnightIcon from '../assets/icons/knight.svg';
import QueenIcon from '../assets/icons/queen.svg';

export interface SquareProps {
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
  // Use theme colors; primary for X (Knight), teal-ish for O (Queen) to maintain Ocean contrast
  const color = value === 'X' ? 'var(--primary)' : value === 'O' ? '#0f766e' : 'var(--text)';

  // Render icon based on value, keep accessible name via aria-label on button; icon is decorative
  const renderIcon = () => {
    const size = 36;
    const commonStyle: React.CSSProperties = {
      width: size,
      height: size,
      color, // currentColor used by SVG fill for consistent theming
      filter: isWinning ? 'drop-shadow(0 2px 6px rgba(245,158,11,0.35))' : 'none',
      transition: 'color 200ms ease, filter 200ms ease',
    };
    if (value === 'X') {
      return <img src={KnightIcon} alt="" aria-hidden="true" style={commonStyle} />;
    }
    if (value === 'O') {
      return <img src={QueenIcon} alt="" aria-hidden="true" style={commonStyle} />;
    }
    return null;
  };

  // Refined aria label: announce Knight/Queen/empty
  const computedAria = ariaLabel
    ? ariaLabel
    : value === 'X'
    ? 'Knight'
    : value === 'O'
    ? 'Queen'
    : 'empty';

  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      disabled={disabled}
      aria-label={computedAria}
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
        transition:
          'transform 120ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease',
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
      {renderIcon()}
    </button>
  );
};
