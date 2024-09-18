import React, { useState, useEffect, useRef } from 'react';
import ChessSquare from './ChessSquare';
import ChessPiece from './ChessPiece';
import { Chess } from 'chess.js'; // Імпортуємо chess.js для логіки шахової гри

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [status, setStatus] = useState(''); // Статус гри (для відображення мата або шаху)

  const [whiteTime, setWhiteTime] = useState(30 * 60); // 30 хвилин для білих
  const [blackTime, setBlackTime] = useState(30 * 60); // 30 хвилин для чорних
  const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Відстежуємо, чий хід
  const [isGameStarted, setIsGameStarted] = useState(false); // Чи почалася гра

  const timerRef = useRef<NodeJS.Timeout | null>(null); // Для зберігання таймера

  // Оновлюємо таймер для кожного гравця після початку гри
  useEffect(() => {
    if (!isGameStarted) return; // Таймери починають працювати тільки після першого ходу

    if (game.isCheckmate()) {
      setStatus('Checkmate! Game over');
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else if (game.isCheck()) {
      setStatus('Check!');
    } else if (whiteTime <= 0) {
      setStatus('Time out! Black wins!');
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else if (blackTime <= 0) {
      setStatus('Time out! White wins!');
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else {
      setStatus('');
    }
  }, [board, whiteTime, blackTime, isGameStarted]);

  // Логіка для таймера кожного ходу
  useEffect(() => {
    if (!isGameStarted) return; // Не починаємо відлік часу, поки гра не почалася

    if (isWhiteTurn) {
      timerRef.current = setInterval(() => {
        setWhiteTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else {
      timerRef.current = setInterval(() => {
        setBlackTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    return () => clearInterval(timerRef.current as NodeJS.Timeout); // Зупиняємо таймер після зміни ходу
  }, [isWhiteTurn, isGameStarted]);

  // Конвертуємо секунди в формат хвилин і секунд
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Функція для переміщення фігур
  const movePiece = (toX: number, toY: number, fromX: number, fromY: number) => {
    const from = `${String.fromCharCode(97 + fromX)}${8 - fromY}`;
    const to = `${String.fromCharCode(97 + toX)}${8 - toY}`;

    try {
      const move = game.move({ from, to });
      if (move) {
        setBoard(game.board()); // Оновлюємо дошку після валідного ходу
        setIsWhiteTurn(!isWhiteTurn); // Змінюємо хід гравця

        if (!isGameStarted) {
          setIsGameStarted(true); // Починаємо гру після першого ходу
        }
      } else {
        setStatus('Invalid move!'); // Виводимо м'яке повідомлення для користувача
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
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto' }}>
        {squares}
      </div>

      {/* Відображення статусу гри (шах, мат або неправильний хід) */}
      <div style={{ marginTop: '20px', fontSize: '24px', color: 'red' }}>
        {status}
      </div>

      {/* Відображення таймерів для обох гравців */}
      <div style={{ marginTop: '20px', fontSize: '20px' }}>
        <p>White: {formatTime(whiteTime)}</p>
        <p>Black: {formatTime(blackTime)}</p>
      </div>

      {/* Кнопка для перезапуску гри */}
      <button
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}
        onClick={() => {
          const newGame = new Chess(); // Створюємо нову гру
          setGame(newGame); // Оновлюємо стан гри
          setBoard(newGame.board()); // Оновлюємо дошку
          setWhiteTime(30 * 60); // Перезапускаємо таймер білих
          setBlackTime(30 * 60); // Перезапускаємо таймер чорних
          setIsWhiteTurn(true); // Починає білий
          setIsGameStarted(false); // Гра не починається до першого ходу
          setStatus(''); // Очищуємо статус
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default ChessBoard;
