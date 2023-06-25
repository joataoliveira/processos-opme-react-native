import { useState, useEffect, useContext } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  SwitchBase,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView
} from 'react-native'
import SeguradoControler from '../api/seguradoController'
import { ListItem, Icon, Button } from 'react-native-elements'
import AppContext from '../context/AppContext'

const ListaBeneficiarios = ({ navigation, route }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { state, dispatch } = useContext(AppContext)

  var seguradoControler = new SeguradoControler()

  const getUsersNaAPI = async () => {
    try {
      setLoading(true)
      console.log(state)
      const resposta = await seguradoControler.pegarSegurados(
        state.credentials.token
      )
      setUsers(resposta)
    } catch (error) {
      setUsers([])
      console.log(error)
      alert('Falha ao acessar servidor. Tente novamente mais tarde!')
    } finally {
      setLoading(false)
    }
  }

  /*
  const Item = (props) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate('Detail', { id: props.item.id }) }}>
        <View style={styles.item}>
          <Text style={styles.titulo}>{props.item.id}</Text>
          <Text style={styles.titulo}>{props.item.nomeSegurado}</Text>
        </View>
      </TouchableOpacity>
    )
  }*/

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => loadForm(user)}
          icon={<Icon name="edit" size={25} color="orange" />}
          buttonStyle={{
            minHeight: '100%',
            minWidth: '50%',
            backgroundColor: 'light-gray'
          }}
        />
        <Button
          onPress={() => confirmSeguradoRemove(user)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={{
            minHeight: '100%',
            minWidth: '50%',
            backgroundColor: 'gray'
          }}
        />
      </>
    )
  }

  const loadForm = user => {
    navigation.navigate('Edição e Cadastro', { user })
  }

  const loadProc = user => {
    navigation.navigate('Lista de Processos', { user })
  }

  const confirmSeguradoRemove = async user => {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          setLoading(true)
          seguradoControler.removeSegurado(state.credentials.token, user)
          getUsersNaAPI()
          setLoading(false)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  function getBeneficiariosItem({ item: user }) {
    return (
      <ListItem.Swipeable
        key={user.id}
        bottomDivider
        rightContent={getActions(user)}
        rightStyle={styles.buttonContainer}
        onPress={() => loadProc(user)}
      >
        <ListItem.Content>
          <ListItem.Title>Id: {user.id}</ListItem.Title>
          <ListItem.Subtitle>Segurado: {user.nomeSegurado}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Data de Nascimento: {user.dataNascimento}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Carteira: {user.carteira.carteira}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Via: {user.carteira.viaCarteira}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  useEffect(() => {
    getUsersNaAPI()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          renderItem={getBeneficiariosItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffD',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  item: {
    backgroundColor: '#0AE',
    padding: 20,
    margin: 10
  },
  titulo: {
    color: 'white',
    textAlign: 'right'
  },
  buttonContainer: {
    flexDirection: 'row'
  }
})

export { ListaBeneficiarios }
