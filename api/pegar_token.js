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
      console.log('User Autenticado: ')
      console.log(response.status)
      if (response.status == 201) {
        const credentials = await response.json()
        console.log(credentials)
        return credentials
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default PegarToken
