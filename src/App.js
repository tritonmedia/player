import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './routes/home'
import Player from './routes/player'
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/play/:id" component={Player} />
      </div>
    </Router>
  );
}

export default App;
