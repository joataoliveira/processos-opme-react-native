import React, { useEffect, useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  Platform
} from 'react-native'
import * as Location from 'expo-location'
import { UrlTile } from 'react-native-maps'
import MapView from 'react-native-maps'
import AppContext from '../context/AppContext'

const Localizacao = ({ navigation, route }) => {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState()
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Please grant location permissions')
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      console.log('Location:')
      console.log(currentLocation)
    }
    getPermissions()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Olá, {state.credentials.login}! Você está aqui:
      </Text>
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsUserLocation
          >
            <UrlTile maximumZ={19}></UrlTile>
          </MapView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mapContainer: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
    overflow: 'hidden'
  },
  map: {
    flex: 1
  }
})

export { Localizacao }
