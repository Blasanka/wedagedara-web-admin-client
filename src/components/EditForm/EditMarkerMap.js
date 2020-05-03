import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// axios
// import axios from "axios";

// var locations = {};

// function getMarkers(label) {
//   console.log(`/locations/${label}`);
//   axios.get(`/locations/${label}`).then((res) => {
//     locations = res.data;
//   });
// }

export default class EditMarkerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        title: "Capital in Sri Lanka",
        name: "COLOMBO",
        position: { lat: props.latitude, lng: props.longitude },
      },
      editType: props.editType,
    };
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMapClick = (map) => {
    const { latLng } = map;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat + " " + lng);

    this.props.getMarkers({ lat: lat, lng: lng });

    this.setState((previousState) => {
      return {
        marker: {
          title: "",
          name: "",
          position: { lat, lng },
        },
      };
    });
  };

  CustomSkinMap = () => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 6.9271, lng: 79.8612 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          {
            featureType: "poi.park",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      }}
      onClick={this.onMapClick}
    >
      {/* <Marker position={{ lat: 6.9271, lng: 79.8612 }} />
      {props.markers &&
        props.markers.forEach(e => {
          return <Marker position={{ lat: e.lat, lng: e.lng }} />;
        })} */}
      {this.state.marker && (
        <Marker
          key={this.state.marker.position.lat}
          title={this.state.marker.title}
          name={this.state.marker.name}
          position={this.state.marker.position}
        />
      )}
    </GoogleMap>
  );

  render() {
    const WrapperMap = withScriptjs(withGoogleMap(this.CustomSkinMap));
    return (
      <WrapperMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

EditMarkerMap.propTypes = {
  markers: PropTypes.array,
  getMarkers: PropTypes.func.isRequired,
  editType: PropTypes.string,
  latitude: PropTypes.any.isRequired,
  longitude: PropTypes.any.isRequired,
};
