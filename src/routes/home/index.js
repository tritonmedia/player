import React from 'react';

import LolmoRow from '../../components/LolmoRow'
import Header from '../../components/Navbar'


// TODO(jaredallard): fix when we add categories and stuff
const categories = ['movie', 'tv']

function Home() {
  return (
    <div>
      <Header />
      <div className="App-main">
        {categories.map(cat => {
          const formatted = cat.charAt(0).toUpperCase() + cat.slice(1)
          return <LolmoRow key={cat} name={formatted} type={cat} items={[]} />
        })}
      </div>
    </div>
  )
}

export default Home;
