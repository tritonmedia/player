import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './routes/home'
import { SeriesPlayer, EpisodePlayer } from './routes/player'
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
          <Route path="/" exact component={Home} />
          <Route path={["/play/:id", "/play/:id/:episodeid"]} component={SeriesPlayer} />
      </div>
    </Router>
  );
}

export default App;
