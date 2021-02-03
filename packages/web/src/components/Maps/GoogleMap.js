import React from 'react';
// react components used to create a google map
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const regularGoogleMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.defaultZoom || 8}
      defaultCenter={props.defaultCenter}
      defaultOptions={{
        scrollwheel: false,
      }}
      {...props.googleMapOptions}
    >
      <Marker position={props.markPosition} {...props.markerOptions} />
    </GoogleMap>
  )),
);

export default regularGoogleMap;
