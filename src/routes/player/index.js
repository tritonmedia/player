import React from 'react';
// import './index.css'

import MediaPlayer from '../../components/MediaPlayer'
import Header from '../../components/Navbar'
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

class SeriesPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      series: props.location.state.series
    }
  }
  render() {
    return (
      <div>
        <Header nested={true} history={this.props.history} />
        <div className="App-main">
          <MediaPlayer 
            id={this.props.match.params.id}
            episode_id={this.props.match.params.episode_id}
            backgroundURL={this.props.location.state.backgroundURL}
            item={this.props.location.state.item}
            series={this.state.series} />
        </div>
      </div>
    )
  }

  // TODO(jaredallard): probably move this somewhere else
  async componentWillMount() {
    if (!this.props.location.state.series) {
      const series = await window.APIClient.getSeries(this.props.match.params.id)
      this.state.series = series.data
      this.forceUpdate()
    }
  }

  async componentDidMount() {

    if (!this.props.episode_id && this.props.location.state.item.type === 2) {
      const eps = await window.APIClient.listEpisodes(this.props.match.params.id)
      eps.data = eps.data.sort((a, b) => a.absolute_number - b.absolute_number)

      // filter 0 season episodes because those are hard to handle currently
      if (this.props.location.state.item.type === 2) eps.data = eps.data.filter(ep => ep.season !== 0)
      console.log('redirecting to last watched / initial episode')
      this.props.history.replace(`/play/${this.props.match.params.id}/${eps.data[0].id}`, {
        item: eps.data[0],
        series: this.props.item
      })
    }
  }
}

export { SeriesPlayer }
