/**
 * MediaPLayer is a media player object
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'
import Plyr from 'plyr';

class MediaItem extends React.Component {
  render() {
    return (
      <div className="media-container">
        <div className="player-container">
          <video id="player"></video>
        </div>
        <div className="media-information">
          <h1 className="media-title">
            {this.props.title}
          </h1>
          <p className="media-dr">
            {this.props.item.first_aired.split('-')[0]}
            <i className="material-icons media-star-icon"></i>
            {Math.round(parseInt(this.props.item.rating, 10) * 100) / 100}
          </p>
          <p className="media-description">
            {this.props.item.overview}
          </p>
        </div>
      </div>
    )
  }

  async componentDidMount() {
    const eps = await window.APIClient.listEpisodes(this.props.id)
    if (eps.data.length > 1) {
      throw new Error('tv series not implemented')
    }

    // TODO(jaredallard): support resuming x episode
    const files = await window.APIClient.getEpisodeFiles(this.props.id, eps.data[0].id)
    const plyr_files = files.data.map(file => {
      return {
        src: file.url,
        type: 'video/webm',
        size: parseInt(file.quality.replace('p', ''), 10)
      }
    })

    console.log('files', plyr_files)

    const player = new Plyr('#player');
    console.log('plyr background url', this.props.backgroundURL)
    player.source = {
      type: 'video',
      title: this.props.title,
      sources: plyr_files,
      poster: this.props.backgroundURL
    }
  }
}

export default MediaItem