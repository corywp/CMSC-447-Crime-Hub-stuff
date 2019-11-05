import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BarChart} from 'react-easy-chart';

function App() {
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
    </div>
  );
}

export default App;
