import React from 'react';
import './App.css';

import LolmoRow from './components/LolmoRow'

function App() {
  const items = [
    {
      id: 0,
      title: "KonoSuba",
      imageUrl: "https://image.tmdb.org/t/p/original/5Tq8v0HhzUX1QJWcmef5HyhKCkh.jpg",
    },
    {
      id: 1,
      title: 'Plastic Memories',
      imageUrl: "https://image.tmdb.org/t/p/original/wNPTjZ4rm5MPwZtAhiMzS270suV.jpg"
    },
    {
      id: 3,
      title: "KonoSuba",
      imageUrl: "https://image.tmdb.org/t/p/original/5Tq8v0HhzUX1QJWcmef5HyhKCkh.jpg",
    },
  ]
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">TRITON</div>
      </header>
      <div className="App-main">
        <LolmoRow name="Next Up" items={items}/>
      </div>
    </div>
  );
}

export default App;
