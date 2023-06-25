import { Component } from 'react'

// const prefURI = 'http://localhost:3000'
const prefURI = 'http://192.168.1.14:3000'

class SeguradoProc {
  pegarprocessos = async token => {
    try {
      const uri = prefURI + '/processos'
      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      console.log('Listar processos: ')
      console.log(response.status)
      if (response.status == 200) {
        const processos = await response.json()
        //console.log(processos)
        return processos
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }

  

  
}

export default SeguradoProc
