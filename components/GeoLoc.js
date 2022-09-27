import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet,FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const GeoLoc = () => {
    const[latitud,setLatitud] = useState(0);
    const[longitud,setLongitud] = useState(0);
    Geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
              setLatitud(position.coords.latitude)
              setLongitud(position.coords.longitude)
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        return (
            <View style={styles.container}>
              <MapView 
                style={styles.map}
                region={{
                  latitude:latitud,
                  longitude:longitud,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            </View>
        )
     
      


  
  
}

const styles = StyleSheet.create({
  
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GeoLoc;