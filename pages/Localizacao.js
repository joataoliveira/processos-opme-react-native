import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, PermissionsAndroid, Button, Platform } from "react-native";
import * as Location from 'expo-location';
import {UrlTile} from 'react-native-maps';

import MapView from "react-native-maps";

const Localizacao = ({ navigation, route }) => {
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();



  /*  useEffect(() => {
        const getPermissions = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log("Please grant location permissions");
            return;
          }
    
          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          console.log("Location:");
          console.log(currentLocation);
        };
        getPermissions();
      }, []); 

      */

    
    return (
        <View >
            <MapView style={{with:'100%',height:'100%'}} showsUserLocation>
            <UrlTile maximumZ={19} ></UrlTile>
            </MapView>
        </View>
    )

}


export { Localizacao }