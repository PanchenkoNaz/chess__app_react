import React from 'react';

interface ChessPieceProps {
  piece: string;
  color: string;
  x: number;
  y: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, color, x, y }) => {
  const isBlackSquare = (x + y) % 2 === 1; // Визначаємо колір клітинки

  // Конвертуємо фігуру в шаховий символ
  const chessSymbols: { [key: string]: string } = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', // Чорні фігури
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', // Білі фігури
  };

  const symbol = chessSymbols[piece] || '?'; // Отримуємо символ фігури

  return (
    <div
      style={{
        fontSize: '40px',
        fontFamily: 'Chess Merida, sans-serif',
        color: isBlackSquare ? 'white' : 'black', // Якщо клітинка чорна, фігура буде білою, і навпаки
      }}
    >
      {symbol}
    </div>
  );
};

export default ChessPiece;
