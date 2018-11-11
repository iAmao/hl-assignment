import React from 'react';
import Pulse from './Pulse';

import './style.css';


const Loader = (props) => {
  return (
    <div className="hl-circle">
      <div className="hl-circle1 hl-child"></div>
      <div className="hl-circle2 hl-child"></div>
      <div className="hl-circle3 hl-child"></div>
      <div className="hl-circle4 hl-child"></div>
      <div className="hl-circle5 hl-child"></div>
      <div className="hl-circle6 hl-child"></div>
      <div className="hl-circle7 hl-child"></div>
      <div className="hl-circle8 hl-child"></div>
      <div className="hl-circle9 hl-child"></div>
      <div className="hl-circle10 hl-child"></div>
      <div className="hl-circle11 hl-child"></div>
      <div className="hl-circle12 hl-child"></div>
    </div>
  )
};

Loader.Pulse = Pulse;

export default Loader;
