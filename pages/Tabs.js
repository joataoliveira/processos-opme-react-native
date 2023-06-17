import { useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Switch, SwitchBase, Text, TextInput, View, TouchableOpacity, Alert, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ListaBeneficiarios } from './ListaBeneficiarios';
import { FormularioBeneficiario } from './FormularioBeneficiario';
import SeguradoControler from '../api/seguradoController';
import PegarToken from '../api/pegar_token';

function Feed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed!</Text>

        </View>
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}

const Tabs = ({ navigation }) => {

    const Tab = createBottomTabNavigator();
    return (

        <NavigationContainer>

            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Lista de Beneficiários"
                    component={ListaBeneficiarios}
                    options={{
                        tabBarLabel: 'Beneficiarios',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-group" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Edição e Cadastro"
                    component={FormularioBeneficiario}
                    options={{
                        tabBarLabel: 'Cadastro',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-edit" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );

}
export { Tabs }