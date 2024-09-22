import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend для перетягування
import Preloader from './components/Preloader'; 
import ChessBoard from './components/ChessBoard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloader = document.querySelector('.preloader-container');
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Завершення анімації
    }, 3000); // Preloader відображається 3 секунди
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <DndProvider backend={HTML5Backend}> {/* Обертаємо у DndProvider */}
          <ChessBoard />
        </DndProvider>
      )}
    </div>
  );
};

export default App;
