import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import API from './lib/api'

window.APIClient = new API(
  's',
  'http://127.0.0.1:3401'
)
window.S3_URL = 'http://127.0.0.1:9000/'

ReactDOM.render(<App />, document.getElementById('root'));
