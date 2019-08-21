import React from 'react';
import './home.css';

import LolmoRow from '../../components/LolmoRow'


// TODO(jaredallard): fix when we add categories and stuff
const categories = ['movie', 'tv']

function Home() {
  return categories.map(cat => {
    const formatted = cat.charAt(0).toUpperCase() + cat.slice(1)
    return <LolmoRow name={formatted} type={cat} items={[]} />
  })
}

export default Home;
