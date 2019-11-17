import React from 'react';
import ReactDOM from 'react-dom';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
const Chart = (props) => {

    const dataArr = props.data.map((d)=> {
        return {x: d.crimetime ,
        y: d.crimetime.length}
    });

    return (
        <XYPlot
            xType="ordinal"
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of time" />
            <YAxis title="Number of Crimes" />
                <LineSeries
                    data={dataArr}
                    style={{stroke: 'violet', strokeWidth: 3}}
                    />
        </XYPlot>
    );

}
export default Chart;
