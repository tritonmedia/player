import React from 'react';
// import './index.css'

import MediaPlayer from '../../components/MediaPlayer'
import Header from '../../components/Navbar'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header nested={true} history={this.props.history} />
        <div className="App-main">
          <MediaPlayer id={this.props.match.params.id} title={this.props.location.state.title} />
        </div>
      </div>
    )
  }
}

export default Home;
