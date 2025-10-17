import React from 'react';
import { GameMode, Player } from '../types';
import KnightIcon from '../assets/icons/knight.svg';
import QueenIcon from '../assets/icons/queen.svg';

export interface ControlsProps {
  mode: GameMode;
  firstPlayer: Player;
  canReset: boolean;
  onModeChange: (mode: GameMode) => void;
  onReset: () => void;
  onToggleFirst: () => void;
}

// PUBLIC_INTERFACE
export const Controls: React.FC<ControlsProps> = ({
  mode,
  firstPlayer,
  canReset,
  onModeChange,
  onReset,
  onToggleFirst,
}) => {
  const btnBase: React.CSSProperties = {
    border: '1px solid rgba(17,24,39,0.08)',
    background: 'linear-gradient(180deg, #fff, #f9fafb)',
    color: 'var(--text)',
    padding: '10px 14px',
    borderRadius: 12,
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)',
    fontWeight: 600,
    transition: 'background 200ms ease, transform 120ms ease',
  };

  const activeBtn: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(37,99,235,0.14), #fff)',
    border: '1px solid rgba(37,99,235,0.35)',
    color: 'var(--primary)',
  };

  const dangerBtn: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(239,68,68,0.1), #fff)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: 'var(--error)',
  };

  return (
    <div
      role="group"
      aria-label={`Game controls - mode ${mode}`}
      data-mode={mode}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}
    >
      <span className="visually-hidden" aria-live="polite">Mode: {mode}</span>
      <button
        type="button"
        onClick={() => onModeChange('pvp')}
        aria-pressed={mode === 'pvp'}
        style={{ ...btnBase, ...(mode === 'pvp' ? activeBtn : {}) }}
      >
        Player vs Player
      </button>
      <button
        type="button"
        onClick={() => onModeChange('cpu')}
        aria-pressed={mode === 'cpu'}
        style={{ ...btnBase, ...(mode === 'cpu' ? activeBtn : {}) }}
      >
        Player vs Computer
      </button>

      <button
        type="button"
        onClick={onToggleFirst}
        style={{
          ...btnBase,
          gridColumn: 'span 1',
          background:
            firstPlayer === 'X'
              ? 'linear-gradient(180deg, rgba(37,99,235,0.08), #fff)'
              : 'linear-gradient(180deg, rgba(16,185,129,0.08), #fff)',
          border:
            firstPlayer === 'X'
              ? '1px solid rgba(37,99,235,0.35)'
              : '1px solid rgba(5,150,105,0.35)',
          color: firstPlayer === 'X' ? 'var(--primary)' : '#0f766e',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
        aria-label="Toggle first player"
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          First:
          <img
            src={firstPlayer === 'X' ? KnightIcon : QueenIcon}
            alt=""
            aria-hidden="true"
            style={{ width: 18, height: 18, verticalAlign: 'middle', color: 'currentColor' }}
          />
          <span aria-hidden="true">{firstPlayer === 'X' ? 'Knight' : 'Queen'}</span>
        </span>
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={!canReset}
        style={{
          ...btnBase,
          ...(canReset ? dangerBtn : {}),
          opacity: canReset ? 1 : 0.6,
          cursor: canReset ? 'pointer' : 'not-allowed',
        }}
      >
        Reset
      </button>
    </div>
  );
};
