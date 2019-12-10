import React from "react";
import { LineChart } from "react-d3-components";
class LineGraph extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      graphData: []
      }
      this.makeGraph = this.makeGraph.bind(this);
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

      makeGraph() {
        var data = {
          label: 'Weapon Distribution',
          values: this.state.graphData
        };
        return (data);
      }
  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
          var xydata = [];
          var unique_weapon_types = "";
          var crime_count_by_weapon_type = 0;
          for (var i = 0; i < data.neighborhood_names.length; i++) {
          var newdata = {x: data.neighborhood_names[i], y: data.overall_crime_count_by_district[data.neighborhood_names[i]]};
          xydata.push(newdata);
      }
      this.state.graphData = [... xydata];
  return (
    <LineChart
      data={this.makeGraph()}
      width={400}
      height={400}
      margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
    />
  );
}
}
}
export default LineGraph;
