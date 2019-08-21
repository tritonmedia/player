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
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  render() {
    return (
      <div className="lolmoRow">
        <h2 className="rowHeader">
          {this.props.name}
        </h2>
        <div className="items">
          {this.state.items}
        </div>
      </div>
    )
  }

  async componentDidMount() {
    const series = await window.APIClient.listSeries(this.props.type)
    const items = series.data.map(item => {
      const posters = item.images.filter(img => img.image_type === 'poster')
      console.log('found posters', posters)
      const rankedImages = posters.sort((a, b) => b.rating - a.rating)

      // TODO(jaredallard): default image

      console.log('using image', rankedImages[0])
      return (<MediaItem
          id={item.id}
          key={item.id}
          title={item.title}
          imageUrl={rankedImages[0].url}
        />)
    })
    this.setState({items})
  }
}

export default LolmoRow