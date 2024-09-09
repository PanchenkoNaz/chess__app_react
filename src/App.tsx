import React from 'react';
import ChessBoard from './components/ChessBoard';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ChessBoard />
    </div>
  );
};

export default App;
