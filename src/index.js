import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import API from './lib/api'

window.APIClient = new API(
  'c03141f5c9e3237f4d199949bf6bc9115f05cb2489cda6cf757cfb07837aa8eed7117e83aaa7452542146aadb019cffe8d3b3cc7709433f012f9a8fd2e9e1300',
  'http://127.0.0.1:3401'
)
window.S3_URL = 'http://127.0.0.1:9000/'

ReactDOM.render(<App />, document.getElementById('root'));
