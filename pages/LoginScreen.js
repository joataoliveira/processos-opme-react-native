import React, { useState } from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import PegarToken from '../api/pegar_token'
import * as LocalAuthentication from 'expo-local-authentication'

const LoginScreen = () => {
  const navigation = useNavigation()
  const { state, dispatch } = useContext(AppContext)
  const [isLoading, setLoading] = useState(false)
  const controller = new PegarToken()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const handleBiometricAuth = async () => {
    const hasBiometricAuth = await LocalAuthentication.hasHardwareAsync()

    if (!hasBiometricAuth) {
      // Dispositivo não suporta autenticação biométrica
      return
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!isEnrolled) {
      // Nenhuma biometria (impressão digital, reconhecimento facial, etc.) está cadastrada no dispositivo
      console.log('erro nenhuma biometria')
      return
    }

    const result = await LocalAuthentication.authenticateAsync()

    if (result.success) {
      // Autenticação biométrica bem-sucedida
      // Realize ações de login aqui
      console.log('Deu certo')
      navigation.navigate('Tabs')
    } else {
      // Autenticação biométrica falhou ou foi cancelada pelo usuário
      console.log('Falhou')
    }
  }

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
        handleBiometricAuth()
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  logo: {
    width: 250,
    height: 250,
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
