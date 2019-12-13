import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarGraph from './BarGraph.js';
import LineGraph from './LineGraph.js';
import PieGraph from './PieGraph.js';
import Map from './Map.js';
import MapFilter from './MapFilter.js'

import ReactDOM from "react-dom";
import styled from "styled-components";

const Image = styled.img`
  height: 300px;
  width: 600px;
  right: 10;
`;


var origin = window.location.origin;
var url = origin + '/api/crimes'



class GetCrimes extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
      return (
        <div className="App">
        <Image src={require('./crime logo.jpg')}/>
        <div>
        <Map/>
        </div>
        <div>
        <LineGraph/>
        </div>
        <div>
        <BarGraph/>
        </div>
        <div>
          <PieGraph/>
        </div>
        </div>
      )
    }
  }


export default GetCrimes;
