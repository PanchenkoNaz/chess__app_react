import React from 'react';
import { useDrag } from 'react-dnd';

interface ChessPieceProps {
  piece: string;
  color: string;
  x: number;
  y: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, color, x, y }) => {
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
        opacity: isDragging ? 0.5 : 1, // Прозорість при перетягуванні
        cursor: 'move',
        color: color === 'w' ? 'white' : 'black', // Білий або чорний колір фігури
      }}
    >
      {piece}
    </div>
  );
};

export default ChessPiece;
