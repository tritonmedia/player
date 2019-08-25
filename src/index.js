import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import API from './lib/api'

window.APIClient = new API(
  'c030ab5c6519f6e0765f3d88302fa2e63942fc9f32ea314fbffa209a76be7d8db4124f0fbca67f100ba365ef388c3481d694e0d7e21ee8f27e7d529996389016',
  'http://127.0.0.1:3401'
)
window.S3_URL = 'http://127.0.0.1:9000/'

ReactDOM.render(<App />, document.getElementById('root'));
