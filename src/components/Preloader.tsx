import React, { useEffect, useState } from 'react';
import './Preloader.css'; // Підключаємо CSS для анімації

const Preloader: React.FC = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-text">Chess App</div>
    </div>
  );
};

export default Preloader;
