import 'moment/locale/pt-br'

import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import commonStyles from '../commonStyles'
import moment from 'moment'

export default props => {
	const doneOrNotSyle = props.doneAt != null ? styles.taskDone : {}
	const date = props.doneAt ? props.doneAt : props.estimateAt
	const formattedDate = moment(date)
		.locale('pt-br')
		.format('ddd, D [de] MMMM')
	return (
		<TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
			<View style={styles.container}>
				<View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
				<View>
					<Text style={[styles.desc, doneOrNotSyle]}>{props.desc}</Text>
					<Text style={styles.date}>{formattedDate + ''}</Text>
					{/* <Text>{props.doneAt + ''}</Text> */}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

function getCheckView(doneAt) {
	if (doneAt != null) {
		return (
			<View style={styles.done}>
				<Icon name="check" size={20} color={commonStyles.colors.secondary} />
			</View>
		)
	} else {
		return <View style={styles.pendding} />
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: '#AAA',
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 10,
	},
	checkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%',
	},
	pendding: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#555',
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#555',
		backgroundColor: '#4D7031',
		alignItems: 'center',
		justifyContent: 'center',
	},
	desc: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 15,
	},
	taskDone: {
		textDecorationLine: 'line-through',
	},
	date: {
		fontFamily: commonStyles.fontFamily,
		fontSize: 12,
	},
})
