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
import SeguradoProc from '../api/processoSegurados'
import { ListItem, Icon, Button } from 'react-native-elements'
import AppContext from '../context/AppContext'

const ListaProcessos = ({ navigation, route }) => {
  const [users, setUsers] = useState([])
  const [seg, setSeg] = useState(
    route.params ? (route.params.user ? route.params.user : {}) : {}
  )
  
  console.log("Inicio da pagina")
  console.log(route.params)
  console.log(seg)
  
  const [isLoading, setLoading] = useState(true)
  const { state, dispatch } = useContext(AppContext)

  //console.log(seg)
  var seguradoProc = new SeguradoProc()

  const getProcessos = async () => {


    try {

      setLoading(true)
      const resposta = await seguradoProc.pegarprocessos(
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

  
  function getListProcessos({ item: user }) {
    return (
      <ListItem.Swipeable
        key={user.id}
        bottomDivider
    
      >
        <ListItem.Content>
          <ListItem.Title>Id: {user.id}</ListItem.Title>
          <ListItem.Subtitle>Segurado: {user.seqHospital}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Data de Nascimento: {user.crmMedico}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Carteira: {user.seguradoId}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  useEffect(() => {
    getProcessos()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          renderItem={getListProcessos}
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

export { ListaProcessos }
