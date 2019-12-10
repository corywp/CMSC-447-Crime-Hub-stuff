import React, { Component } from 'react';
import Select, { components } from 'react-select';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
    </components.DropdownIndicator>
  );
};

var origin = window.location.origin;
var url = origin + '/api/crimes'
var g = [
  'rgba(0,255,255,0)','rgba(0,255,255,1)','rgba(0,191,255,1)','rgba(0,127,255,1)',
	'rgba(0,63,255,1)','rgba(0,0,223,1)','rgba(0,0,191,1)','rgba(0,0,159,1)',
	'rgba(0,0,127,1)','rgba(63,0,91,1)','rgba(191,0,31,1)','rgba(255,0,0,1)',
]
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      selectedOption: null

    };
  }
  static defaultProps = {
    center: {
      lat: 39.2858,
      lng: -76.6131
    },
    zoom: 13,
    data: {
  positions: [
  ],
  options: {
    radius: 89,
    gradient: g,
  }
},
  typeOptions: [],
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
          var filterData = [];
          var unique_weapon_types = "";
          var crime_count_by_weapon_type = 0;
          for (var i = 0; i < data.crimes.length; i++) {
          var newdata = {lat: data.crimes[i]["latitude"], lng: data.crimes[i]["longitude"]};
            if(this.state.selectedOption === null)
            {
              xydata.push(newdata);
            }
          }
        this.props.data["positions"] = [... xydata];

        for (var i = 0; i < data.unique_crime_types.length; i++) {
          var pushdata = {value: data.unique_crime_types[i], label: data.unique_crime_types[i]};
        filterData.push(pushdata);
        }
        this.props.typeOptions = [... filterData];
        console.log(this.state.selectedOption);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '75%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC35-l6-ZU04_xf6l_mIUcbFPT9lWzhxq0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={this.props.data}
        >
        </GoogleMapReact>
        <Select
          closeMenuOnSelect={false}
          components={{ DropdownIndicator }}
          isMulti
          options={this.props.typeOptions}
        />
      </div>

    );
  }
}
}
export default Map;
