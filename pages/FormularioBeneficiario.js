import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native'
import SeguradoControler from '../api/seguradoController'
import PegarToken from '../api/pegar_token'
import { TextInputMask } from 'react-native-masked-text'

const FormularioBeneficiario = ({ navigation, route }) => {
  //console.warn(route.params);
  //console.log(route.params);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const [user, setUser] = useState(
    route.params ? (route.params.user ? route.params.user : {}) : {}
  )

  var seguradoControler = new SeguradoControler()
  var controller = new PegarToken()
  var token

  let getUsersNaAPI = async () => {
    token = await controller.authUser('admin', 'admin')
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
        onChangeText={carteira => setUser({ ...user, carteira })}
        placeholder="Informe o número da carteira"
        value={user.carteira}
      />
      <Text style={styles.label}>Via da carteira</Text>
      <TextInput
        style={styles.input}
        onChangeText={viaCarteira => setUser({ ...user, viaCarteira })}
        placeholder="Via"
        value={user.viaCarteira}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (user.id != null) {
            console.log('DEVE ATUALIZAR')
            updateClient()
            navigation.navigate('ListClients')
          } else {
            await getUsersNaAPI()
            seguradoControler.saveSegurado(token.token, user)
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
    backgroundColor: '#55b586',
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
