import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from './pages/Tabs'
import LoginScreen from './pages/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppContext, { Provider } from './context/AppContext'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
