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
    type: 'piece', // Вказуємо тип елемента
    item: { x, y }, // Координати, звідки фігура рухається
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Відстежуємо, чи фігура в процесі перетягування
    }),
  }));

  // Конвертуємо фігуру в шаховий символ
  const chessSymbols: { [key: string]: string } = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', // Чорні фігури
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', // Білі фігури
  };

  const symbol = chessSymbols[piece] || '?'; // Отримуємо символ фігури

  return (
    <div
      ref={drag} // Додаємо можливість перетягування
      style={{
        fontSize: '7vmin',
        fontFamily: 'Chess Merida, sans-serif',
        color: color === 'w' ? 'white' : 'black',
        opacity: isDragging ? 0.5 : 1, // Фігура стає прозорою під час перетягування
        cursor: 'grab', // Змінюємо курсор миші на "руку" під час наведення
      }}
    >
      {symbol}
    </div>
  );
};

export default ChessPiece;
