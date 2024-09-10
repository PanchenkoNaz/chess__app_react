// App.tsx
import React from 'react';
import { DndProvider } from 'react-dnd'; // Імпортуємо DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Імпортуємо бекенд для drag-and-drop
import ChessBoard from './components/ChessBoard'; // Імпортуємо компонент ChessBoard

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}> {/* Додаємо контекст для drag-and-drop */}
      <div>
        <ChessBoard /> {/* Рендеримо шахову дошку */}
      </div>
    </DndProvider>
  );
};

export default App;
