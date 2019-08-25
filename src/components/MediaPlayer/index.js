/**
 * MediaPLayer is a media player object
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'
import Plyr from 'plyr';
import MediaItem from '../MediaItem'


// TODO(jaredallard): don't copy LolmoRow here
class EpisodeList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      isLoading: false
    }
    console.log(props)
  }
  render() {
    return (
      <div className="lolmoRow">
        <h2 className="rowHeader">
          Episodes
        </h2>
        <div className="items">
          {this.props.eps.map(item => {
            return (<MediaItem
              id={this.props.series_id}
              episode_id={item.id}
              key={item.id}
              imageUrl={item.thumbnail_url}
              title={`S${item.season}:E${item.season_number} - ${item.title}`}
              item={item}
              wide={true}
            />)
          })}
        </div>
      </div>
    )
  }
}

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      episodes: [],
      player: {},
      series: {},
    }
  }

  render() {
    return (
      <div className="media-container">
        <div className="player-container">
          <video id="player"></video>
        </div>
        <div className="media-information">
          <h1 className="media-title">
            {this.props.item.title}
          </h1>
          <p className="media-dr">
            {(this.props.item.first_aired ? this.props.item.first_aired : this.props.item.air_date).split('-')[0]}
            <i className="material-icons media-star-icon"></i>
            {Math.round(parseInt(this.props.item.rating || 10, 10) * 100) / 100}
          </p>
          <p className="media-description">
            {this.props.item.overview || this.props.item.description}
          </p>
          <br /><br />
          {this.state.series.type === 2 ? <EpisodeList series_id={this.props.id} eps={this.state.episodes} series={this.props.item} type="tv"/> : ''}
        </div>
      </div>
    )
  }

  async componentDidMount() {
    const eps = await window.APIClient.listEpisodes(this.props.id)

    // TODO(jaredallard): support resuming x episode
    let files = { data: [] }
    try {
      // use the first episode or a manually specified one
      let episode_id = eps.data[0].id
      files = await window.APIClient.getEpisodeFiles(this.props.id, episode_id)
    } catch (err) {
      // TODO(jaredallard): better handling of this
      if (err.message !== 'Not Found') {
        throw err
      }
    }
    const plyr_files = files.data.map(file => {
      return {
        src: file.url,
        type: 'video/webm',
        size: parseInt(file.quality.replace('p', ''), 10)
      }
    })

    const player = new Plyr('#player');
    player.source = {
      type: 'video',
      title: this.props.item.title,
      sources: plyr_files,
      poster: this.props.backgroundURL ? this.props.backgroundURL : this.props.item.thumbnail_url
    }

    console.log(player.source)

    this.setState({
      player,
      episodes: eps.data,
      series: this.props.item
    })
  }

  async componentWillReceiveProps(props) {
    const { player } = this.state

    // TODO(jaredallard): support resuming x episode
    let files = { data: [] }
    try {
      // use the first episode or a manually specified one
      let episode_id = props.item.id
      files = await window.APIClient.getEpisodeFiles(props.id, episode_id)
    } catch (err) {
      // TODO(jaredallard): better handling of this
      if (err.message !== 'Not Found') {
        throw err
      }
    }
    const plyr_files = files.data.map(file => {
      return {
        src: file.url,
        type: 'video/webm',
        size: parseInt(file.quality.replace('p', ''), 10)
      }
    })

    player.source = {
      type: 'video',
      title: props.item.title,
      sources: plyr_files,
      poster: props.backgroundURL ? props.backgroundURL : props.item.thumbnail_url
    }

    this.setState({player})
  }
}

export default MediaPlayer