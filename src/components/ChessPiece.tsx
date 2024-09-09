import React from 'react';
import { useDrag } from 'react-dnd';

interface ChessPieceProps {
  piece: string;
  x: number;
  y: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, x, y }) => {
  // Використовуємо useDrag для додавання функціоналу перетягування
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        fontSize: '32px',
        opacity: isDragging ? 0.5 : 1, // Фігура стає прозорою під час перетягування
        cursor: 'move',
      }}
    >
      {piece}
    </div>
  );
};

export default ChessPiece;
