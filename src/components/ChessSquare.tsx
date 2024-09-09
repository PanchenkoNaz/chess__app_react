import React from 'react';
import { useDrop } from 'react-dnd';

interface ChessSquareProps {
  x: number;
  y: number;
  children?: React.ReactNode;
  movePiece: (toX: number, toY: number) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ x, y, children, movePiece }) => {
  const isBlack = (x + y) % 2 === 1;
  const backgroundColor = isBlack ? 'black' : 'white';

  // Налаштовуємо useDrop для прийому фігури
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: () => movePiece(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isOver ? 'yellow' : backgroundColor, // Підсвічує клітинку під час перетягування
      }}
    >
      {children}
    </div>
  );
};

export default ChessSquare;
