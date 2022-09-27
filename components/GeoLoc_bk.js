import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet,FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class GeoLoc extends Component {
    constructor(){
      super()
      this.state = {
        region: {
          latitude: null,
          longitude: null,
          latitudeDelta: null,
          longitudeDelta: null
        }
      }
    }
    componentDidMount() {
      Geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0462,
                        longitudeDelta: 0.0261,
                    },
                });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
 }

 render(){
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          
        />
      </View>
    )
  }

  
  
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