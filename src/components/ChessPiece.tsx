import React from 'react';

interface ChessPieceProps {
  piece: string;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
  return (
    <div style={{ fontSize: '32px' }}>
      {piece}
    </div>
  );
};

export default ChessPiece;
