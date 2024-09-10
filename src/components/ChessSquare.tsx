import React from 'react';
import { useDrop } from 'react-dnd';

interface ChessSquareProps {
  x: number;
  y: number;
  children?: React.ReactNode;
  movePiece: (toX: number, toY: number, fromX: number, fromY: number) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ x, y, children, movePiece }) => {
  const isBlack = (x + y) % 2 === 1; // Визначаємо колір клітинки

  // Логіка для прийому перетягнутої фігури
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { x: number; y: number }) => movePiece(x, y, item.x, item.y), // Виклик функції переміщення фігури
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const backgroundColor = isBlack ? '#4A4A4A' : '#D3D3D3'; // Темно-сірий для чорних, світло-сірий для білих

  return (
    <div
      ref={drop} // Додаємо можливість прийому перетягування
      style={{
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isOver ? 'yellow' : backgroundColor, // Підсвічування при наведенні
      }}
    >
      {children}
    </div>
  );
};

export default ChessSquare;
