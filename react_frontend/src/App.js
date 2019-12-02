import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarGraph from './BarGraph.js';
import LineGraph from './LineGraph.js';
import PieGraph from './PieGraph.js';
import Map from './Map.js';
var origin = window.location.origin;
var url = origin + '/api/crimes'


class GetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }


  componentDidMount() {
    fetch("http://127.0.0.1:3000/api/crimes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var xydata = [];
      var lastdate = "0";
      var total_crimes = 0;
      for (var i = 0; i < data.length; i++) {
        if (lastdate == "0") {
          lastdate = data[i].crimedate;
        } else if (data[i].crimedate != lastdate) {
          var newdata = {x: lastdate, y: total_crimes};
          xydata.push(newdata);

          lastdate = data[i].crimedate;
          total_crimes = 0;
        }

        total_crimes += 1;
      }

      return (
        <div className="App">
        <div>
        <Map/>
        </div>
        <div>
          <BarGraph/>
        </div>
        <div>
          <LineGraph/>
        </div>
        <div>
          <PieGraph/>
        </div>
        <ul>
            {data.map(data => (
              <li key={data.post}>
                {data.crimedate} {data.crimetime} {data.description} {data.weapon}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default GetCrimes;
