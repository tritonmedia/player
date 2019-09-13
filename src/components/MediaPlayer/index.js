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
  }
  render() {
    const eps = typeof this.props.eps === 'object' && Array.isArray(this.props.eps) ? this.props.eps : []
    return (
      <div className="lolmoRow">
        <h2 className="rowHeader">
          Episodes
        </h2>
        <div className="items">
          {eps.map(item => {
            return (<MediaItem
              id={this.props.series.id}
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
  render() {
    if(!this.props.series) this.props.series = {}
    if(!this.props.episode) this.props.episode = {}
    return (
      <div className="media-container">
        <div className="player-container">
          <video id="player" crossOrigin="anonymous"></video>
        </div>
        <div className="media-information">
          <h1 className="media-title">
            {this.props.series.title}
          </h1>
          <h3 className="media-subtitle">
            {this.props.episode.title}
          </h3>
          <p className="media-dr">
            {(this.props.series.first_aired ? this.props.series.first_aired : this.props.episode.air_date || '').split('-')[0]}
            <i className="material-icons media-star-icon">star</i>
            {Math.round(parseInt(this.props.episode.rating || 10, 10) * 100) / 100}
          </p>
          <p className="media-description">
            {this.props.episode.description || this.props.series.overview}
          </p>
          <br /><br />
          {this.props.series.type === 2 ? <EpisodeList eps={this.props.episodes} series={this.props.series} type="tv"/> : ''}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.player = new Plyr('#player', {
      ratio: '16:9'
    });
  }

  async componentDidUpdate() {
    console.log('mediaplayer::didUpdate(): called')
    const props = this.props

    const { series, episode } = props

    // TODO(jaredallard): support resuming x episode
    let files = { data: [] }
    try {
      files = await window.APIClient.getEpisodeFiles(series.id, episode.id)
    } catch (err) {
      // TODO(jaredallard): better handling of this
      if (err.message !== 'Not Found') {
        throw err
      }
    }

    let subtitles = { data: [] }
    try {
      subtitles = await window.APIClient.getSubtitles(series.id, episode.id)
    } catch (err) {
      if (err.message !== 'Not Found') {
        console.log('mediaplayer::didUpdate(): no subtitles found')
      }
    }

    const plyr_files = files.data.map(file => {
      return {
        src: file.url,
        type: 'video/webm',
        size: parseInt(file.quality.replace('p', ''), 10)
      }
    })

    const captions = subtitles.data.map(sub => {
      return {
        kind: 'captions',
        label: sub.language,
        srclang: sub.language,
        src: sub.url
      }
    })

    this.player.source = {
      type: 'video',
      title: props.episode.title,
      sources: plyr_files,
      imageURL: props.episode.thumbnail_url,
      tracks: captions,
    }
  }
}

export default MediaPlayer