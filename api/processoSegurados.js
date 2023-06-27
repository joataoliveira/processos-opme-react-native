import { Component } from 'react'

const prefURI = 'http://172.20.10.3:3000'
//const prefURI = 'http://172.20.2.0:3000'

class SeguradoProc {
  pegarprocessos = async (token, id) => {
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
      //console.log('Listar processos: ')
      //console.log(response.status)
      if (response.status == 200) {
        const processos = await response.json()

        if (id != 0) {
          const processosFiltrados = processos.filter(
            processo => processo.segurado && processo.segurado.id === id
          )
          return processosFiltrados
        } else {
          return processos
        }
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default SeguradoProc
