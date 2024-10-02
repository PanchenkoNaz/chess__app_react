import React from 'react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect }) => {
  return (
    <div>
      <h2>Choose your color</h2>
      <button onClick={() => onColorSelect('white')}>Play as White</button>
      <button onClick={() => onColorSelect('black')}>Play as Black</button>
    </div>
  );
};

export default ColorPicker;
