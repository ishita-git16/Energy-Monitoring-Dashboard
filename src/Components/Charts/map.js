import React, {Component} from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
const TOKEN = "pk.eyJ1IjoiYW5kcm9pZDE4IiwiYSI6ImNrczA2bG1scTFoOHgybnFleDZxajZzNGIifQ.PVOntUZA4IbE8IIN5U-I9w";
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
class Map extends Component {
constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 21.7679,
        longitude: 78.8718,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 585,
        height: 263,
      }
    };
  }
render() {
    const {viewport} = this.state;
return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}>
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </MapGL>
    );
  }
}

export default Map;