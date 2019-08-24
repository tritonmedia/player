import React from 'react';
// import './index.css'

import MediaPlayer from '../../components/MediaPlayer'
import Header from '../../components/Navbar'

class SeriesPlayer extends React.Component {
  render() {
    return (
      <div>
        <Header nested={true} history={this.props.history} />
        <div className="App-main">
          <MediaPlayer 
            id={this.props.match.params.id}
            episode_id={this.props.match.params.episode_id}
            backgroundURL={this.props.location.state.backgroundURL}
            item={this.props.location.state.item} />
        </div>
      </div>
    )
  }
}

class EpisodePlayer extends React.Component {
  render() {
    return (
      <div>
        <Header nested={true} history={this.props.history} />
        <div className="App-main">
          <MediaPlayer 
            id={this.props.match.params.id}
            episode_id={this.props.match.params.episode_id}
            item={this.props.location.state.item} />
        </div>
      </div>
    )
  }
}

export { SeriesPlayer, EpisodePlayer }
