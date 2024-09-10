import React, { useState, useEffect } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { Chess, Piece as ChessPieceType } from 'chess.js'; // Імпортуємо Chess.js

// Тип для фігури
interface Piece {
  type: string;
  color: string;
}

const ChessBoard: React.FC = () => {
  const [game] = useState(new Chess()); // Ініціалізуємо нову шахову гру
  const [board, setBoard] = useState<(Piece | null)[][]>(game.board()); // Типізуємо двовимірний масив

  const [status, setStatus] = useState(''); // Статус гри

  // Перевіряємо, чи є шах або мат
  useEffect(() => {
    if (game.isCheckmate()) {
      setStatus('Checkmate! The game is over');
    } else if (game.isCheck()) {
      setStatus('Check!');
    } else {
      setStatus('');
    }
  }, [board]);

  // Логіка для переміщення фігури
  const movePiece = (toX: number, toY: number, fromX: number, fromY: number) => {
    const from = `${String.fromCharCode(97 + fromX)}${8 - fromY}`;
    const to = `${String.fromCharCode(97 + toX)}${8 - toY}`;

    try {
      const move = game.move({
        from: from,
        to: to,
      });

      if (move) {
        setBoard(game.board()); // Оновлюємо дошку після валідного ходу
      } else {
        setStatus('Invalid move!');
      }
    } catch (error) {
      setStatus('Invalid move! Try again.');
    }
  };

  // Рендеримо кожну клітинку шахової дошки
  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);

    const square = board[y][x]; // Отримуємо інформацію про клітинку
    const piece = square ? square.type : null;
    const color = square ? square.color : '';

    return (
      <ChessSquare key={i} x={x} y={y} movePiece={movePiece}>
        {piece && <ChessPiece piece={piece} color={color} x={x} y={y} />}
      </ChessSquare>
    );
  };

  // Генеруємо масив клітинок для рендерингу дошки
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto' }}>
        {squares}
      </div>
      <div style={{ marginTop: '20px', fontSize: '24px', color: 'red' }}>
        {status}
      </div>
      <button 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}
        onClick={() => {
          const newGame = new Chess(); // Перезапуск гри
          setBoard(newGame.board());
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default ChessBoard;
