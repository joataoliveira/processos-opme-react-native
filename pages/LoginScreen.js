import React from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Processos OPME</Text>
      <TextInput
        placeholder="Usuário"
        style={styles.input}
        textContentType="username"
      />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Tabs')}
      >
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 250,
    height: 250,
    //marginBottom: 50,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#55b586',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  loginText: {
    color: '#fff',
    fontSize: 16
  }
})

export default LoginScreen
