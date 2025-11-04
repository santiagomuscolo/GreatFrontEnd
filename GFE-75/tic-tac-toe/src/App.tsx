import { useState } from "react";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: string[]) {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] };
    }
  }
  return { winner: null };
}

function Cell({ disabled, mark, onClick }: { disabled: boolean, mark: string, onClick: () => void }) {
  return (
    <button className="cell" disabled={disabled} onClick={onClick}>
      <span className="mark">{mark}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(false);

  const { winner } = calculateWinner(board);

  function status() {
    if (winner && winner !== null) {
      return `The winner is ${winner}`;
    }

    if (!board.includes(null)) {
      return "It's a draw!";
    }
  }

  return (
    <div className="app">
      <p className="status">{status()}</p>
      <div className="board-container">
        <div className="board">
          {Array(9)
            .fill(null)
            .map((_, index) => index)
            .map((cellIndex) => {
              const turn = xIsPlaying ? "X" : "O";

              return (
                <Cell
                  key={cellIndex}
                  disabled={board[cellIndex] !== null}
                  onClick={() => {
                    const newBoard = board.slice();
                    newBoard[cellIndex] = turn;
                    setBoard(newBoard);
                    setXIsPlaying(!xIsPlaying);
                  }}
                  mark={board[cellIndex]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
