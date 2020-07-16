import {Alert, Platform} from 'react-native'

const lanServer = '192.168.100.5'
const localServer = 'localhost'
const androidServer = '10.0.2.2'
const port = 3000
const server =
	Platform.OS === 'ios'
		? `http://${lanServer}:${port}`
		: `http://${androidServer}:${port}`

function showError(err) {
	Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function showSucces(msg) {
	Alert.alert('Sucesso!', msg)
}

export {server, showError, showSucces}
