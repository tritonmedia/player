import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import API from './lib/api'

window.APIClient = new API(
  'b60f2c99b88d616d5c4cb615c119dd582273298d97fe036cea5a5eee6376822606e0beded035fbbd9265296e4871942cc75e5620eebfbabbc760e6ba97a50305',
  'http://127.0.0.1:3401'
)
window.S3_URL = 'http://127.0.0.1:9000/'

ReactDOM.render(<App />, document.getElementById('root'));
