/**
 * MediaItem is a media item used to display information on a media item
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MediaItem extends React.Component {
  render() {
    return (
      <div className="mediaItem">
        <Link to={{
          pathname: `/play/${this.props.id}`,
          state: {
            title: this.props.title
          }
        }}>
        <div className="backdrop">
          <img src={this.props.imageUrl} alt="backdrop"></img>
        </div>
        <div className="info">
          {this.props.title}
        </div>
        </Link>
      </div>
    )
  }
}

export default MediaItem