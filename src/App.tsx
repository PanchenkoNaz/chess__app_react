import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import ChessBoard from './components/ChessBoard';


const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const preloader = document.querySelector('.preloader-container');
      if (preloader) {
        preloader.classList.add('fade-out'); // Додаємо клас для плавного зникнення
      }
      setTimeout(() => {
        setLoading(false); // Показуємо основний контент після завершення анімації
      }, 1000); // Затримка для завершення анімації
    }, 3000); // Preloader відображається 3 секунди
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader /> // Показуємо preloader поки сторінка завантажується
      ) : (
        <ChessBoard /> // Показуємо шахову дошку після зникнення preloader-а
      )}
    </div>
  );
};

export default App;
