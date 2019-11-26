
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
    fetch("http://52.206.59.30:3000/api/crimes")
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
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 500px;
        margin-right: 200px;
        padding: auto;
      }
    </style>
  </head>
    <div id="map"></div>
    </html>
      var map;
      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.2904, lng: -76.6122},
          zoom: 13
        });
        var heatmapData = [
          {location: new google.maps.LatLng(39.2201, -76.6122), weight: 9.8},
          new google.maps.LatLng(39.2201, -76.6122),
          {location: new google.maps.LatLng(39.2909, -76.6232), weight: 9.8},
          {location: new google.maps.LatLng(39.3242, -76.6313), weight: 9.8},
          {location: new google.maps.LatLng(39.2954, -76.6175), weight: 9.8},
          new google.maps.LatLng(39.2954, -76.6175),
          {location: new google.maps.LatLng(39.2542, -76.4325), weight: 9.8},
        ];
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      heatmap.setMap(map);
      }

    </script>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=false&key=AIzaSyC35-l6-ZU04_xf6l_mIUcbFPT9lWzhxq0&callback=initMap">
    </script>
