import React, { useState, useEffect } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { Chess } from 'chess.js'; // Імпортуємо бібліотеку chess.js

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess()); // Ініціалізуємо шахову гру
  const [board, setBoard] = useState(game.board()); // Зберігаємо стан шахової дошки
  const [status, setStatus] = useState(''); // Статус гри (Шах, Мат тощо)

  // Перевіряємо стан гри (шах/мат)
  useEffect(() => {
    if (game.in_checkmate()) {
      setStatus('Мат! Гра завершена');
    } else if (game.in_check()) {
      setStatus('Шах!');
    } else {
      setStatus('');
    }
  }, [board, game]);

  // Функція для переміщення фігури
  const movePiece = (toX: number, toY: number, fromX: number, fromY: number) => {
    const move = game.move({
      from: `${String.fromCharCode(97 + fromX)}${8 - fromY}`, // Конвертуємо координати
      to: `${String.fromCharCode(97 + toX)}${8 - toY}`,
    });

    if (move) {
      setBoard(game.board()); // Оновлюємо дошку, якщо хід валідний
    }
  };

  // Функція для перезапуску гри
  const resetGame = () => {
    const newGame = new Chess(); // Створюємо нову гру
    setGame(newGame);
    setBoard(newGame.board()); // Оновлюємо стан дошки
  };

  // Рендер кожної клітинки дошки
  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = board[y][x] ? board[y][x].type : null;
    const color = board[y][x] ? board[y][x].color : null;
    return (
      <ChessSquare key={i} x={x} y={y} movePiece={movePiece}>
        {piece && <ChessPiece piece={piece} color={color} x={x} y={y} />}
      </ChessSquare>
    );
  };

  // Генеруємо масив з клітинок дошки
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto' }}>
        {squares}
      </div>
      {/* Виведення статусу гри (Шах/Мат) */}
      <div style={{ marginTop: '20px', fontSize: '24px', color: 'red' }}>
        {status}
      </div>
      {/* Кнопка для перезапуску гри */}
      <button 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}
        onClick={resetGame}
      >
        Перезапустити гру
      </button>
    </div>
  );
};

export default ChessBoard;
