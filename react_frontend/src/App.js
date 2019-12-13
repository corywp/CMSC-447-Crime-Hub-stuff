import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarGraph from './BarGraph.js';
import LineGraph from './LineGraph.js';
import PieGraph from './PieGraph.js';
import Map from './Map.js';
import MapFilter from './MapFilter.js'
var origin = window.location.origin;
var url = origin + '/api/crimes'


class GetCrimes extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
      return (
        <div className="App">
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
