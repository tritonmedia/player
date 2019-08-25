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
      <div className={"mediaItem" + (this.props.wide ? ' wide' : ' media')}>
        <Link to={{
          pathname: `${this.props.episode_id ? `/play/${this.props.id}/${this.props.episode_id}`: `/play/${this.props.id}`}`,
          state: {
            title: this.props.title,
            imageURL: this.props.imageUrl,
            backgroundURL: this.props.backgroundURL,
            item: this.props.item
          }
        }}>
        <div className={"backdrop" + (this.props.wide ? ' wide' : ' media')}>
          <img src={this.props.imageUrl} alt={`${this.props.title} backdrop`} align="middle"></img>
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