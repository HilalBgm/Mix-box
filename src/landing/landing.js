import React, { Component } from 'react';
import Background from './../../public/images/polygon-1980897_1920.jpg';


class Landing extends Component {
  render() {
    return (
      <div className="Landing">
          <img className="wallpaper" src={Background}/>
      </div>
    );
  }
}

export default Landing;
