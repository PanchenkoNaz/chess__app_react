import React from 'react';

interface ChessPieceProps {
  piece: string;
  color: string;
  x: number;
  y: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, color }) => {
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
        color: color === 'w' ? 'white' : 'black', // Визначаємо колір фігури на основі її кольору
      }}
    >
      {symbol}
    </div>
  );
};

export default ChessPiece;
