import React, { useState } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';

const ChessBoard: React.FC = () => {
  // Використовуємо useState для збереження стану дошки
  const [board, setBoard] = useState([
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ]);

  // Функція для переміщення фігури
  const movePiece = (toX: number, toY: number) => {
    // Логіка переміщення (можна розширити)
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map(row => [...row]);
      const piece = newBoard[toY][toX]; // Отримуємо фігуру
      newBoard[toY][toX] = piece;
      return newBoard;
    });
  };

  // Функція для рендерингу клітинки та фігури
  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = board[y][x];
    return (
      <ChessSquare key={i} x={x} y={y} movePiece={movePiece}>
        {piece && <ChessPiece piece={piece} x={x} y={y} />}
      </ChessSquare>
    );
  };

  // Рендер усіх 64 клітинок дошки
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px' }}>{squares}</div>;
};

export default ChessBoard;
