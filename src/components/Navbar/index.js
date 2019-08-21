/**
 * MediaPLayer is a media player object
 * @author Jared Allard <jaredallaerd@outlook.com>
 * @license MIT
 * @version 1
 */

import React from 'react';
import './index.css'

class Header extends React.Component {
  render() {
    const logo = <div className="App-logo">TRITON</div>
    return (
      <header className="App-header">
        {
          this.props.history ? 
            <button type="button" onClick={this.props.history.goBack} className="Navbar-button"><i className="material-icons"></i></button>
            :
            logo
        }
      </header>
    )
  }
}

export default Header