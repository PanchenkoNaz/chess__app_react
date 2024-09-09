import React from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';

const ChessBoard: React.FC = () => {
  // Початкова розстановка фігур
  const initialBoard = [
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"], // 1-ий рядок білих фігур
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // 2-ий рядок білих пішаків
    Array(8).fill(null), // Порожні рядки
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // 7-ий рядок чорних пішаків
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // 8-ий рядок чорних фігур
  ];

  // Функція для рендерингу клітинки та фігури
  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = initialBoard[y][x];
    return (
      <ChessSquare key={i} x={x} y={y}>
        {piece && <ChessPiece piece={piece} />}
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
