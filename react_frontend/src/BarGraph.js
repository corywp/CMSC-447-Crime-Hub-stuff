import React from "react";
import { BarChart } from "react-d3-components";
class BarGraph extends React.Component{
    constructor(props)
    {
      super(props);
    }
    makeGraph() {
      var data = [
        {
          label: "somethingA",
          values: [
            { x: "SomethingA", y: 10 },
            { x: "SomethingB", y: 4 },
            { x: "SomethingC", y: 3 }
          ]
        }
      ];
      return (data);
    }
  render(){
  return (
    <BarChart
      data={this.makeGraph()}
      width={400}
      height={400}
      margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
    />
  );
}
}
export default BarGraph;
