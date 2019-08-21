import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import API from './lib/api'

window.APIClient = new API(
  '7b40ffcea17083f0cadfb7121549b07dbfdc2eefaaf587270f3b0b2e11a312b8cbb44af6bb00a79bef3cff59bf29c5194a8cf59ac77b68749561013220cb8cd5',
  'http://127.0.0.1:3401'
  )

ReactDOM.render(<App />, document.getElementById('root'));
