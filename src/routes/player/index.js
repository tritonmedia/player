import React from 'react';
// import './index.css'

import MediaPlayer from '../../components/MediaPlayer'

class Home extends React.Component {
  render() {
    return (
      <MediaPlayer id={this.props.match.params.id} title={this.props.location.state.title} />
    )
  }
}

export default Home;
