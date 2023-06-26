import React, { useState, useContext } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native'
import SeguradoControler from '../api/seguradoController'
import { TextInputMask } from 'react-native-masked-text'
import AppContext from '../context/AppContext'

const FormularioBeneficiario = ({ navigation, route }) => {
  const [user, setUser] = useState(
    route.params ? (route.params.user ? route.params.user : {}) : {}
  )
  const { state, dispatch } = useContext(AppContext)
  var seguradoControler = new SeguradoControler()
  console.log(user)

  const salvaSegurado = async () => {
    await seguradoControler.saveSegurado(state.credentials.token, user)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={nomeSegurado => setUser({ ...user, nomeSegurado })}
        placeholder="Informe o Nome"
        value={user.nomeSegurado}
      />
      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInputMask
        style={styles.input}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY'
        }}
        placeholder="Data de Nascimento"
        value={user.dataNascimento}
        onChangeText={dataNascimento => setUser({ ...user, dataNascimento })}
      />
      <Text style={styles.label}>Carteira</Text>
      <TextInput
        style={styles.input}
        onChangeText={carteira =>
          setUser({ ...user, carteira: { ...user.carteira, carteira } })
        }
        placeholder="Informe o número da carteira"
        value={user.carteira?.carteira?.toString()}
      />
      <Text style={styles.label}>Via da carteira</Text>
      <TextInput
        style={styles.input}
        onChangeText={viaCarteira =>
          setUser({ ...user, carteira: { ...user.carteira, viaCarteira } })
        }
        placeholder="Via"
        value={user.carteira?.viaCarteira?.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (user.id != null) {
            console.log('DEVE ATUALIZAR toke =>', state.credentials.token, 'user : ' , user)
            await seguradoControler.updateSegurado(state.credentials.token, user)
            //navigation.navigate('ListClients')
          } else {
            console.log('DEVE SALVAR O NOVO toke =>', state.credentials.token, 'user : ' , user)
            await seguradoControler.saveSegurado(state.credentials.token, user)
            //navigation.navigate('ListClients')
          }
        }}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#3D8A55',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  }
})

export { FormularioBeneficiario }
