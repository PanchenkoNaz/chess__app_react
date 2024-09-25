import React, { useState, useEffect } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { Chess } from 'chess.js';
import './ChessBoard.css';

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [status, setStatus] = useState(''); // Статус гри (для відображення мата або шаху)

  // Оновлюємо статус гри
  useEffect(() => {
    if (game.isCheckmate()) {
      setStatus('Checkmate! Game over');
    } else if (game.isDraw()) {
      setStatus('Draw! Game over');
    } else if (game.isCheck()) {
      setStatus('Check!');
    } else {
      setStatus('');
    }
  }, [board]);

  // Функція для переміщення фігур з промоцією пішака
  const movePiece = (toX: number, toY: number, fromX: number, fromY: number) => {
    const from = `${String.fromCharCode(97 + fromX)}${8 - fromY}`;
    const to = `${String.fromCharCode(97 + toX)}${8 - toY}`;

    try {
      const move = game.move({
        from,
        to,
        promotion: 'q', // Промоція пішака автоматично на ферзя (королеву)
      });

      if (move) {
        setBoard([...game.board()]); // Оновлюємо дошку після валідного ходу
      } else {
        setStatus('Invalid move!'); // Виводимо повідомлення для користувача про неправильний хід
      }
    } catch (error) {
      setStatus('Invalid move! Try again.');
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
      <ChessSquare key={i} x={x} y={7 - y} movePiece={movePiece}>
        {piece && <ChessPiece piece={piece} color={color} x={x} y={7 - y} />}
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
      <div
        className="chess-board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)', // Чітко встановлюємо 8 колонок для сітки
          gridTemplateRows: 'repeat(8, 1fr)', // Кожен рядок рівний
          width: '90vmin', // Автоматично адаптується під висоту та ширину екрану
          height: '90vmin',
          margin: '20px auto',
        }}
      >
        {squares}
      </div>

      {/* Відображення статусу гри (шах, мат або неправильний хід) */}
      <div style={{ marginTop: '20px', fontSize: '24px', color: 'red' }}>
        {status}
      </div>

      {/* Кнопка для перезапуску гри */}
      <button
        className="restart-button"
        onClick={() => {
          window.location.reload(); // Перезавантажуємо сторінку
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default ChessBoard;
