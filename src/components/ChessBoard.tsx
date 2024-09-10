import React, { useState } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { Chess } from 'chess.js'; // Використовуємо chess.js для логіки шахової гри

const ChessBoard: React.FC = () => {
  // Ініціалізуємо нову гру
  const [game] = useState(new Chess());

  // Отримуємо стартову позицію дошки з chess.js
  const [board, setBoard] = useState(game.board());

  // Функція для переміщення фігур
  const movePiece = (toX: number, toY: number, fromX: number, fromY: number) => {
    const from = `${String.fromCharCode(97 + fromX)}${8 - fromY}`;
    const to = `${String.fromCharCode(97 + toX)}${8 - toY}`;

    const move = game.move({
      from: from,
      to: to,
    });

    if (move) {
      setBoard(game.board()); // Оновлюємо дошку після валідного ходу
    }
  };

  // Функція для рендерингу кожної клітинки дошки
  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);

    const square = board[7 - y][x]; // Зміна рендерингу для інверсії рядів
    const piece = square ? square.type : null;
    const color = square ? square.color : '';

    return (
      <ChessSquare key={i} x={x} y={7 - y} movePiece={movePiece}> {/* Інверсія y */}
        {piece && <ChessPiece piece={piece} color={color} x={x} y={7 - y} />} {/* Рендеримо фігури */}
      </ChessSquare>
    );
  };

  // Генеруємо масив клітинок для шахової дошки
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Рендеримо шахову дошку */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto' }}>
        {squares}
      </div>

      {/* Кнопка для перезапуску гри */}
      <button
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}
        onClick={() => {
          const newGame = new Chess(); // Створюємо нову гру
          setBoard(newGame.board()); // Перезапускаємо дошку
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default ChessBoard;
