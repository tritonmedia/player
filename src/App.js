import React from 'react';

import LolmoRow from './components/LolmoRow'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './routes/home'
import Player from './routes/player'

// TODO(jaredallard): fix when we add categories and stuff
const categories = ['movie', 'tv']

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-logo">TRITON</div>
        </header>
        <div className="App-main">
          <Route path="/" exact component={Home} />
          <Route path="/play/:id" component={Player} />
        </div>
      </div>
    </Router>
  );
}

export default App;
