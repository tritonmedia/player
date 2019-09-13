import React from 'react';
// import './index.css'

import MediaPlayer from '../../components/MediaPlayer'
import Header from '../../components/Navbar'
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import find from 'lodash.find'

class SeriesPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      series: {},
      episode: {},
      episodes: [],
      eps: [],
      isLoading: true
    }
  }

  render() {
    return (
      <div>
        <Header nested={true} history={this.props.history} />
        <div className="App-main">
          <MediaPlayer {...this.state} />
        </div>
      </div>
    )
  }

  async componentDidUpdate(oldProps) {
    const loggerPrefix = 'player::didUpdate():'
    const props = this.props

    // console.log('player::receiveProps(): called', props)
    const newEpisodeID = props.location.pathname.split('/')[3]
    console.log(loggerPrefix, 'new episode id', newEpisodeID)
    if (newEpisodeID) {
      if (!this.state.episodes) return console.warn(loggerPrefix, 'state.episodes is empty')
      if (this.state.episode.id === newEpisodeID) return console.info(loggerPrefix, 'skipping extra call to page were already on')
      const ep = find(this.state.episodes, {
        id: newEpisodeID
      })
      if (!ep) return console.error(loggerPrefix, 'failed to find episode', newEpisodeID, ep)
      this.setState({
        episode: ep,
        isLoading: false
      })
    }
  }

  async componentDidMount() {
    const loggerPrefix = 'player::didMount():'
    const seriesID = this.props.match.params.id
    const episodeID = this.props.match.params.episode_id || this.props.location.pathname.split('/')[3]

    console.log(loggerPrefix, `seriesID=${this.state.series.id} episodeID=${this.state.episode.id}`)

    let series = this.props.location.state.series
    if (!series) {
      console.log(loggerPrefix, 'series state is empty, fetching from API')
      const s = await window.APIClient.getSeries(seriesID)
      series = s.data
    }

    const eps = await window.APIClient.listEpisodes(seriesID)
    eps.data = eps.data.sort((a, b) => a.absolute_number - b.absolute_number)

    // filter 0 season episodes because those are hard to handle currently
    if (series.type === 2) eps.data = eps.data.filter(ep => ep.season !== 0)

    let ep = find(eps.data, {
      id: episodeID
    })
    if (!episodeID || !ep) {
      console.log(loggerPrefix, 'episodeID is not set in URL, fetching first episode and triggering redirect')
      ep = eps.data[0]
    }

    console.log(loggerPrefix, 'modified episode state')
    this.setState({
      series,
      episode: ep,
      episodes: eps.data,
      isLoading: false
    })

    // change the URL now because to avoid triggering didUpdate
    if (episodeID !== ep.id) {
      const newURL = `${this.props.match.params.id}/${eps.data[0].id}`
      console.log(loggerPrefix, 'triggering redirect', newURL)
      this.props.history.replace(`/play/${newURL}`, {
        item: eps.data[0],
        series: this.props.item
      })
    }
  }
}

export { SeriesPlayer }
