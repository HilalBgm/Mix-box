import React, { Component } from 'react';
import FaIconPack from 'react-icons/lib/fa';
import FaUser from 'react-icons/lib/fa/user';
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down';
import './landing.css';


class Landing extends Component {
  render() {
    return (
      <div className="Landing">
       <div className="login-area">
         <button className="login-btn"><FaUser/> Login </button>
       </div>
       <div className="scroll-icon">
         <FaArrowCircleDown className="Fa-scroll"/>
       </div>
      </div>
    );
  }
}

export default Landing;
