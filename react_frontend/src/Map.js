import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 39.2201,
      lng: -76.6122
    },
    zoom: 13,
    data: {
  positions: [
    {lat: 39.2201, lng: -76.6122},
    {lat: 39.2204, lng: -76.6122},
  ],
  options: {
    radius: 20,
    opacity: 0.6,
  }
  }
}

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC35-l6-ZU04_xf6l_mIUcbFPT9lWzhxq0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={this.props.data}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
