/**
 * MediaPLayer is a media player object
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'
import Plyr from 'plyr';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MediaItem extends React.Component {
  render() {
    return (
      <video id="player"></video>
    )
  }

  async componentDidMount() {
    const eps = await window.APIClient.listEpisodes(this.props.id)
    if (eps.data.length > 1) {
      throw new Error('tv series not implemented')
    }

    const files = await window.APIClient.getEpisodeFiles(this.props.id, eps.data[0].id)
    const plyr_files = files.data.map(file => {
      return {
        src: file.url,
        type: 'video/mp4',
        size: parseInt(file.quality.replace('p', ''), 10)
      }
    })

    console.log(plyr_files)

    const player = new Plyr('#player');

    player.source = {
      type: 'video',
      title: this.props.title,
      sources: plyr_files,
    }
  }
}

export default MediaItem