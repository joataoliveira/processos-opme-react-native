import { Component } from 'react'

class PegarToken {
  authUser = async (login, passwd) => {
    try {
      //const uri = 'http://192.168.1.34:3000/auth/login'
      const uri = 'http://localhost:3000/auth/login'
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: login,
          password: passwd
        })
      })
      const credentials = {
        respHTTP: response.status,
        login: login,
        token: ''
      }
      //console.log(response.status)
      if (response.status == 201) {
        console.log('User Autenticado: ')
        const respToken = await response.json()
        credentials.token = respToken.access_token
        //console.log(credentials.token)
      } else {
        console.log('Nao autorizado! Erro de login e/ou senha.')
      }
      return credentials
    } catch (error) {
      console.error(error)
    }
  }
}

export default PegarToken
