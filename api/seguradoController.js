import { Component } from "react";

class SeguradoControler {

    pegarSegurados = async (token) => {

        try {

            //const uri = 'http://192.168.1.34:3000/segurados'
            const uri = 'http://172.20.3.232:3000/segurados'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token['access_token'],
                }
            });
            console.log("Listar Segurados: ")
            console.log(response.status);
            if (response.status == 200) {
                const segurados = await response.json();
                console.log(segurados);
                return segurados;
            } else {
                return null;
            }

        } catch (error) {
            console.error(error);
        }

    }

    saveSegurado = async (token,user) => {
        try {
            console.log("user do salvar")
            //console.log(token)
            //console.log(user)
            const uri = 'http://172.20.3.232:3000/segurados'
            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token['access_token'],
    
                },
                body: JSON.stringify({
                    nomeSegurado: user.nomeSegurado,
                    dataNascimento: user.dataNascimento,
                    carteira: {
                        carteira: user.carteira,
                        //carteira: '00629999989999995',
                        viaCarteira: user.viaCarteira
                        //viaCarteira: 1
                    }
                })
            });
            console.log(response.status);
            const newClient = await response.json();
            console.log(newClient);
        } catch (error) {
            console.error(error);
        }
    }
}



export default SeguradoControler;
