/**
 * MediaItem is a media item used to display information on a media item
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'

class MediaItem extends React.Component {
  render() {
    return (
      <div className="mediaItem">
        <div className="backdrop">
          <img src={this.props.imageUrl} alt="backdrop"></img>
        </div>
        <div className="info">
          {this.props.title}
        </div>
      </div>
    )
  }
}

export default MediaItem