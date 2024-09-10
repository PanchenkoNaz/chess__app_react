import React from 'react';
import { useDrop } from 'react-dnd';

interface ChessSquareProps {
  x: number;
  y: number;
  children?: React.ReactNode;
  movePiece: (toX: number, toY: number, fromX: number, fromY: number) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({ x, y, children, movePiece }) => {
  const isBlack = (x + y) % 2 === 1;
  const backgroundColor = isBlack ? 'black' : 'white';

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { x: number; y: number }) => movePiece(x, y, item.x, item.y),
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
        backgroundColor: isOver ? 'yellow' : backgroundColor, // Підсвічування при перетягуванні
      }}
    >
      {children}
    </div>
  );
};

export default ChessSquare;
