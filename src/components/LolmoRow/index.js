/**
 * Lolmo is a List of List of Movies row (coined by Netflix)
 * @see https://twitter.com/arungupta/status/624402051116568576?lang=en
 * @author Jared Allard <jaredallard@outlook.com>
 * @license MIT
 */

import React from 'react';

import MediaItem from '../MediaItem'
import './index.css'

class LolmoRow extends React.Component {
  render() {
    const items = this.props.items.map(item => 
      <MediaItem 
        key={item.id}
        name={item.name} 
        title={item.title}
        imageUrl={item.imageUrl}
      />
    )
    return (
      <div className="lolmoRow">
        <h2 className="rowHeader">
          {this.props.name}
        </h2>
        <div className="items">
          {items}
        </div>
      </div>
    )
  }
}

export default LolmoRow