import React, { useState } from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import PegarToken from '../api/pegar_token'

const LoginScreen = () => {
  const navigation = useNavigation()
  const { state, dispatch } = useContext(AppContext)
  const [isLoading, setLoading] = useState(false)
  const controller = new PegarToken()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const getUsersNaAPI = async () => {
    try {
      setLoading(true)
      credentials = await controller.authUser(usuario, senha)

      if (credentials.respHTTP == 201) {
        console.log('entrei')

        var novaCredencial = JSON.stringify({
          login: credentials.login,
          token: credentials.token
        })

        console.log(novaCredencial)

        /*dispatch({
          type: 'authUser', //especifica a ação
          payload: novaCredencial //dado necessário para ação
        })*/
        navigation.navigate('Tabs')
      } else if (credentials.respHTTP == 401) {
        setUsuario('')
        setSenha('')
        alert('Usuário e/ou senha inválidos!')
      }
    } catch (error) {
      console.log('deu ruim')
      console.log(error)
      alert('Falha ao acessar servidor. Tente novamente mais tarde!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Processos OPME</Text>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        style={styles.input}
        textContentType="username"
        autoCapitalize="none"
        onChangeText={value => {
          setUsuario(value)
        }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        style={styles.input}
        onChangeText={value => {
          setSenha(value)
        }}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => getUsersNaAPI()}
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
