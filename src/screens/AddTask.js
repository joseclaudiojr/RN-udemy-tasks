import {
	Modal,
	Model,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import React, {Component} from 'react'

import DateTimePcker from '@react-native-community/datetimepicker'
import commonStyles from '../commonStyles'
import moment from 'moment'

const initialState = {desc: '', date: new Date(), showDatePicker: false}
export default class AddTask extends Component {
	state = {
		...initialState,
	}

	save = () => {
		const newTask = {
			desc: this.state.desc,
			date: this.state.date,
			// spread operator
			// expand an iterable object into the list of arguments
			//...this.state
		}
		// if (this.props.onSave) {
		// 	this.props.onSave(newTask)
		// }
		this.props.onSave &&
			this.props.onSave(newTask) &&
			this.setState({...initialState}) //Reset values only when saved successfully
	}
	setDate = (event, date) => {
		if (date !== undefined) {
			this.setState({date})
		}
		this.setState({showDatePicker: false})
	}
	getDatePicker = () => {
		console.log('this.state.date', this.state.date)
		const dateString = moment(this.state.date).format(
			'ddd, D [de] MMMM [de] YYYY',
		)
		let datePicker = (
			<DateTimePcker
				style={styles.datePicker}
				value={this.state.date}
				onChange={this.setDate}
				mode="date"
			/>
		)

		if (Platform.OS === 'android') {
			datePicker = (
				<View>
					<TouchableOpacity
						onPress={() => this.setState({showDatePicker: true})}>
						<Text style={styles.date}>{dateString}</Text>
					</TouchableOpacity>
					{this.state.showDatePicker && datePicker}
				</View>
			)
		}
		return datePicker
	}

	render() {
		return (
			<Modal
				transparent={true}
				visible={this.props.isVisible}
				onRequestClose={this.props.onCancel}
				animationType="slide">
				<View style={styles.background} />
				<View style={styles.container}>
					<Text style={styles.header}>Nova Tarefa</Text>
					<View style={styles.line} />
					<TextInput
						style={styles.input}
						placeholder="Informe a descrição..."
						value={this.state.desc}
						onChangeText={desc => this.setState({desc})}
					/>
					{this.getDatePicker()}
					<View style={styles.buttons}>
						<TouchableOpacity onPress={this.props.onCancel}>
							<View style={styles.buttonsContainer}>
								<Text style={styles.button}>Cancelar</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.save}>
							<View style={styles.buttonsContainer}>
								<Text style={styles.button}>Salvar</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.background} />
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	container: {
		backgroundColor: commonStyles.colors.today,
	},
	header: {
		fontFamily: commonStyles.fontFamily,
		backgroundColor: commonStyles.colors.today,
		color: commonStyles.colors.secondary,
		textAlign: 'center',
		padding: 15,
		fontSize: 18,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	buttonsContainer: {
		borderWidth: 0.5,
		borderRadius: 6,
		borderColor: commonStyles.colors.secondary,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 60,
		margin: 15,
		color: commonStyles.colors.secondary,
		textAlign: 'center',
	},
	input: {
		color: commonStyles.colors.today,
		padding: 10,
		fontFamily: commonStyles.fontFamily,
		height: 40,
		margin: 15,
		backgroundColor: 'white',
		// borderWidth: 2,
		// borderColor: '#E3E3E3',
		borderRadius: 6,
	},
	date: {
		fontFamily: commonStyles.fontFamily,
		fontSize: 20,
		marginLeft: 15,
		color: commonStyles.colors.secondary,
	},
	datePicker: {
		// backgroundColor: commonStyles.colors.today,
		// color: commonStyles.colors.mainText,
	},
	line: {
		borderWidth: 0.5,
		borderColor: commonStyles.colors.secondary,
		marginHorizontal: 15,
	},
})
