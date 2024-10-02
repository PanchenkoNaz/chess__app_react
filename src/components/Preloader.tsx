import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'Chess Legacy'; // Текст, який зʼявлятиметься поступово

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 250); // Затримка між буквами 150 мс

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-container">
      <div className="preloader-text">
        {text}
      </div>
    </div>
  );
};

export default Preloader;
