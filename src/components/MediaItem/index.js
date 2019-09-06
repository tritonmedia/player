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
  state = {
    loading: true
  }

  style = loading => {
    return {
      transition: '0.5s filter linear',
      filter: `${loading ? 'blur(50px)' : ''}`,
    }
  }

  componentDidMount() {
    this.fetchImage(this.props.imageUrl)
  }

  fetchImage = src => {
    const image = new Image()
    image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false })
    image.src = src
    this.loadingImage = image
  }

  render() {
    const { currentImage, loading } = this.state
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
          <img style={this.style(loading)} src={currentImage} alt={`${this.props.title} backdrop`} align="middle"></img>
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