import React from "react";
import Select, { components } from 'react-select';
import { LineChart } from "react-d3-components";
const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
    </components.DropdownIndicator>
  );
};

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
          var unique_districts = [];
          for (var i = 0; i < 100; i++) {
          var newdata = {x: i, y: 100-i};

          xydata.push(newdata);
          }
      this.state.graphData = [... xydata];
      return(
        <div style={{ position:'relative', height: '100vh',
        top:'35vh',width: '100%'}}>
        <header>
          <h1>Crime Totals over Time</h1>
          </header>
        <LineChart
          data={this.makeGraph()}
          width={1260}
          height={600}
          margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
        >
        </LineChart>

    Neighborhood
    <Select
      closeMenuOnSelect={false}
      components={{ DropdownIndicator }}
      isMulti
      options={this.props.typeOptions}
      onChange={this.updateFilter}
    />

    Month
    <Select
      closeMenuOnSelect={false}
      components={{ DropdownIndicator }}
      isMulti
      options={this.props.typeOptions}
      onChange={this.updateFilter}
    />

    Year
    <Select
      closeMenuOnSelect={false}
      components={{ DropdownIndicator }}
      isMulti
      options={this.props.typeOptions}
      onChange={this.updateFilter}
    />
  </div>
  );
}
}
}
export default LineGraph;
