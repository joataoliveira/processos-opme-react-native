import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import SeguradoControler from '../api/seguradoController';
import PegarToken from '../api/pegar_token';

const FormularioBeneficiario = ({ navigation, route }) => {
    //console.warn(route.params);
    //console.log(route.params);
    const [user, setUser] = useState(route.params ? (route.params.user ? route.params.user : {}) : {})

    var seguradoControler = new SeguradoControler();
    var controller = new PegarToken();
    var token;

    let getUsersNaAPI = async () => {
        token = await controller.authUser('admin', 'admin')
    }

    return (
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput
                style={style.input}
                onChangeText={nomeSegurado => setUser({ ...user, nomeSegurado })}
                placeholder="Informe o Nome"
                value={user.nomeSegurado}
            />
            <TextInput
                style={style.input}
                onChangeText={dataNascimento => setUser({ ...user, dataNascimento })}
                placeholder="Data de Nascimento"
                value={user.dataNascimento}
            />
           
            <TextInput
                style={style.input}
                onChangeText={carteira => setUser({ ...user, carteira })}
                placeholder="Carteira"
                value={user.carteira}
            />
            
            <TextInput
                style={style.input}
                onChangeText={viaCarteira => setUser({ ...user, viaCarteira })}
                placeholder="Via"
                value={user.viaCarteira}
            />
            <Button
                title="Salvar"
                onPress={async () => {
                    if (user.id != null) {
                        console.log("DEVE ATUALIZAR");
                        updateClient();
                        navigation.navigate('ListClients');
                    } else {
                        await getUsersNaAPI();
                        seguradoControler.saveSegurado(token, user);
                    }
                }}
            />
        </View>

    );
}


const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
    }
})

export { FormularioBeneficiario }