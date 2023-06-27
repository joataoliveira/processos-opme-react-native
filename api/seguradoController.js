import { Component } from 'react'

const prefURI = 'http://localhost:3000'
//const prefURI = 'http://172.20.2.0:3000'

class SeguradoControler {
  pegarSegurados = async token => {
    try {
      const uri = prefURI + '/segurados'
      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      console.log('Listar Segurados: ')
      console.log(response.status)
      if (response.status == 200) {
        const segurados = await response.json()
        //console.log(segurados)
        return segurados
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }

  saveSegurado = async (token, user) => {
    try {
      console.log('user do salvar')
      //console.log(token)
      //console.log(user)
      const uri = prefURI + '/segurados'
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          nomeSegurado: user.nomeSegurado,
          dataNascimento: user.dataNascimento,
          carteira: {
            carteira: user.carteira.carteira,
            viaCarteira: user.carteira.viaCarteira
          }
        })
      })
      console.log(response.status)
      const newClient = await response.json()

      return response.status
      //console.log(newClient);
    } catch (error) {
      console.error(error)
    }
  }

  removeSegurado = async (token, user) => {
    try {
      const uri = prefURI + '/segurados/' + user.id
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      console.log(response.status)
      this.pegarSegurados(token)
    } catch (error) {
      console.error(error)
    }
  }

  updateSegurado = async (token, user) => {
    try {
      console.log(user)
      const uri = prefURI + '/segurados/' + user.id
      const response = await fetch(uri, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          nomeSegurado: user.nomeSegurado,
          dataNascimento: user.dataNascimento
        })
      })
      console.log(response.status)
      const newClient = await response.json()

      return response.status
      //console.log(newClient);
    } catch (error) {
      console.error(error)
    }
  }
}

export default SeguradoControler
