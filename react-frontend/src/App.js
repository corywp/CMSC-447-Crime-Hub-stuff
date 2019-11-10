import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BarChart} from 'react-easy-chart';

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
      return (
        <div className="App">
        <BarChart
        data={[
          {x: 'A', y: 20},
          {x: 'B', y: 30},
          {x: 'C', y: 40},
          {x: 'D', y: 20},
          {x: 'E', y: 40},
          {x: 'F', y: 25},
          {x: 'G', y: 5}
        ]}
        />
        <p>My Token = {window.token}</p>
        <ul>
            {data.map(data => (
              <li key={data.post}>
                {data.crimedate} {data.crimetime}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default GetCrimes;
