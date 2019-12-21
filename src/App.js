import React from 'react';
import Metronome from "./components/Metronome";
import './App.css';

function App() {
  return (
    <div className='main-container'>
      <div className='metro-container'>
        <Metronome />
      </div>
    </div>
  );
}

export default App;
