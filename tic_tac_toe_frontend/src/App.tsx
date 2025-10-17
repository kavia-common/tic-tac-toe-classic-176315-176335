import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { GameMode, Player, BoardState } from './types';
import { checkWinner, getEmptyIndices, isDraw, nextPlayer } from './lib/game';
import { computeBestMove } from './lib/ai';
import Logo from './assets/logo.svg';

// PUBLIC_INTERFACE
export default function App() {
  /** App renders the Tic Tac Toe game with Ocean Professional theme. */
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>('X');
  const [mode, setMode] = useState<GameMode>('pvp');
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [firstPlayer, setFirstPlayer] = useState<Player>('X');

  // Compute status text and classes
  const winner = useMemo(() => checkWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    if (winner) {
      setGameOver(true);
      setWinningLine(winner.line);
    } else if (draw) {
      setGameOver(true);
      setWinningLine(null);
    } else {
      setGameOver(false);
      setWinningLine(null);
    }
  }, [winner, draw]);

  // CPU move on its turn
  useEffect(() => {
    if (mode === 'cpu' && !gameOver && current === 'O') {
      const timer = globalThis.setTimeout(() => {
        const move = computeBestMove(board, 'O', 'X');
        if (move !== -1) {
          handleMove(move);
        }
      }, 250);

      return () => {
        globalThis.clearTimeout(timer as unknown as number);
      };
    }
    return undefined;
  }, [mode, current, board, gameOver]);

  const handleMove = (index: number) => {
    if (board[index] || gameOver) return;
    setBoard(prev => {
      const next = prev.slice();
      next[index] = current;
      return next;
    });
    setCurrent(prev => nextPlayer(prev));
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent(firstPlayer);
    setGameOver(false);
    setWinningLine(null);
  };

  const onChangeMode = (m: GameMode) => {
    setMode(m);
    reset();
  };

  const onToggleFirst = () => {
    setFirstPlayer(p => (p === 'X' ? 'O' : 'X'));
  };

  useEffect(() => {
    // When first player changes, reset and set turn to first
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPlayer]);

  const statusText = winner
    ? `Winner: ${winner.player}`
    : draw
    ? 'Draw'
    : mode === 'cpu' && current === 'O'
    ? 'Computer thinking...'
    : `Turn: ${current}`;

  const statusClass =
    winner ? 'status status--win' : draw ? 'status status--draw' : 'status';

  return (
    <div className="container">
      <div className="card">
        <header className="header" aria-label="Game header">
          <img className="header__logo" src={Logo} alt="" />
          <h1 className="header__title">Tic Tac Toe</h1>
        </header>

        <p className={statusClass} role="status" aria-live="polite">
          {statusText}
        </p>

        <Board
          board={board}
          winningLine={winningLine}
          disabled={gameOver || (mode === 'cpu' && current === 'O')}
          onPlay={handleMove}
        />

        <div className="footer">
          <Controls
            mode={mode}
            firstPlayer={firstPlayer}
            canReset={board.some(Boolean) || gameOver}
            onModeChange={onChangeMode}
            onReset={reset}
            onToggleFirst={onToggleFirst}
          />
          <p className="helper-text" aria-hidden="true">
            {mode === 'cpu'
              ? `You are ${firstPlayer === 'X' ? 'X' : 'O'}`
              : `${getEmptyIndices(board).length} moves left`}
          </p>
        </div>
      </div>
    </div>
  );
}
