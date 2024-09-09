import React from 'react';

interface ChessSquareProps {
  x: number;
  y: number;
  children?: React.ReactNode;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ x, y, children }) => {
  const isBlack = (x + y) % 2 === 1; // Визначаємо колір клітинки (чорна чи біла)
  const backgroundColor = isBlack ? 'black' : 'white';

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default ChessSquare;
