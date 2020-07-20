import {
	Alert,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, {Component} from 'react'
import {server, showError, showSucces} from '../common'

import AuthInput from '../components/AuthInput'
import axios from 'axios'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

const initialState = {
	name: '',
	email: 'juca2@juca.com',
	password: 'jucajuca',
	confirmPassword: '',
	stageNew: false,
	loading: false,
}
export default class Auth extends Component {
	state = {
		...initialState,
	}

	singninOrSignup = () => {
		this.setState({loading: true})
		if (this.state.stageNew) {
			this.signup()
		} else {
			this.signin()
		}
	}

	signup = async () => {
		try {
			//console.log('${server}/signup', `${server}/signup`)
			await axios.post(`${server}/signup`, {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
			})
			showSucces('Usuário cadastrado!')
			this.setState({...initialState})
		} catch (e) {
			showError(e)
		}
	}
	signin = async () => {
		try {
			const res = await axios.post(`${server}/signin`, {
				email: this.state.email,
				password: this.state.password,
			})
			// axios.defaults.headers.common['Authorization'] = `bearer ${
			// 	res.data.token
			// }`
			axios.defaults.headers.common.Authorization = `bearer ${res.data.token}`
			this.props.navigation.navigate('Home')
		} catch (e) {
			showError(e)
			this.setState({loading: false})
		}
	}
	render() {
		const validations = []
		validations.push(this.state.email && this.state.email.includes('@'))
		validations.push(this.state.password && this.state.password.length >= 6)
		if (this.state.stageNew) {
			validations.push(this.state.name && this.state.name.trim.length >= 2)
			validations.push(this.state.password === this.state.confirmPassword)
		}
		validations.push(!this.state.loading)
		const validForm = validations.reduce((total, atual) => total && atual)
		return (
			<ImageBackground style={styles.background} source={backgroundImage}>
				<Text style={styles.title}>Tasks</Text>
				<View style={styles.formContainer}>
					<Text style={styles.subtitle}>
						{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
					</Text>
					{this.state.stageNew && (
						<AuthInput
							icon="user"
							placeholder="Nome"
							placeholderTextColor="#3337"
							value={this.state.name}
							onChangeText={name => this.setState({name})}
							style={[styles.input, this.state.loading && styles.inputDisable]}
							editable={!this.state.loading}
						/>
					)}
					<AuthInput
						icon="at"
						placeholder="E-mail"
						placeholderTextColor="#3337"
						value={this.state.email}
						onChangeText={email => this.setState({email})}
						style={[styles.input, this.state.loading && styles.inputDisable]}
						editable={!this.state.loading}
					/>
					<AuthInput
						icon="lock"
						placeholder="Senha"
						placeholderTextColor="#3337"
						value={this.state.password}
						onChangeText={password => this.setState({password})}
						secureTextEntry={true}
						style={[styles.input, this.state.loading && styles.inputDisable]}
						editable={!this.state.loading}
					/>
					{this.state.stageNew && (
						<AuthInput
							icon="asterisk"
							placeholder="Confirmação de Senha"
							placeholderTextColor="#3337"
							value={this.state.confirmPassword}
							onChangeText={confirmPassword => this.setState({confirmPassword})}
							secureTextEntry={true}
							style={[styles.input, this.state.loading && styles.inputDisable]}
							editable={!this.state.loading}
						/>
					)}
					<TouchableOpacity
						onPress={this.singninOrSignup}
						disabled={!validForm}>
						<View style={[styles.button, !validForm && styles.buttonDisable]}>
							<Text style={styles.buttonText}>
								{this.state.stageNew ? 'Registrar' : 'Entrar'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() => {
						this.setState({stageNew: !this.state.stageNew})
					}}>
					<Text style={styles.buttonText}>
						{this.state.stageNew
							? 'Já possui conta?'
							: 'Ainda não possui conta?'}
					</Text>
				</TouchableOpacity>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 70,
		marginBottom: 10,
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 10,
	},
	formContainer: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		padding: 20,
		width: '90%',
		marginBottom: 15,
		borderRadius: 10,
	},
	input: {
		marginTop: 10,
		backgroundColor: '#FFF',
	},
	inputDisable: {
		backgroundColor: '#4449',
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		borderRadius: 7,
	},
	buttonDisable: {
		backgroundColor: '#3339',
	},
	buttonText: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20,
	},
})
