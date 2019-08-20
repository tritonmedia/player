import React from 'react';
import './App.css';

import LolmoRow from './components/LolmoRow'

function App() {
  const anime = [
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
      title: "Sword Art Online",
      imageUrl: "https://www.thetvdb.com/banners/fanart/original/259640-17.jpg",
    },
  ]

  const movies = [
    {
      id: 0,
      title: "Your Name",
      imageUrl: "https://image.tmdb.org/t/p/w500_and_h282_face/7OMAfDJikBxItZBIug0NJig5DHD.jpg"
    },
    {
      id: 1,
      title: 'A Slient Voice',
      imageUrl: "https://image.tmdb.org/t/p/w500_and_h282_face/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg"
    },
    {
      id: 3,
      title: "Spirited Away",
      imageUrl: "https://image.tmdb.org/t/p/w500_and_h282_face/djgM2d3e42p9GFQObg6lwK2SVw2.jpg",
    },
  ]

  const suggested = [
    {
      id: 0,
      title: "Avatar: The Last Airbender",
      imageUrl: "https://www.thetvdb.com/banners/fanart/original/74852-5.jpg"
    },
    {
      id: 2,
      title: "Assasination Classroom",
      imageUrl: "https://www.thetvdb.com/banners/fanart/original/283947-1.jpg"
    },
    {
      id: 3,
      title: "The Devil is a Part Timer",
      imageUrl: "https://www.thetvdb.com/banners/fanart/original/267441-3.jpg"
    },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">TRITON</div>
      </header>
      <div className="App-main">
        <LolmoRow name="Anime" items={anime}/>
        <LolmoRow name="Movies" items={movies}/>
        <LolmoRow name="Based on your Recent History" items={suggested}/>
      </div>
    </div>
  );
}

export default App;
