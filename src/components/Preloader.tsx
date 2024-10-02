import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'Chhess Legacy'; // Тут повинно бути чітко визначене значення тексту

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index)); // Використовуємо charAt замість повного рядка
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Інтервал 150 мс

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-container">
      <div className="preloader-text">
        {text} {/* Відображаємо поступово */}
      </div>
    </div>
  );
};

export default Preloader;
