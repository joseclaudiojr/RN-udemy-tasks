import 'moment/locale/pt-br'

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import commonStyles from '../commonStyles'
import moment from 'moment'

export default props => {
	const doneOrNotSyle = props.doneAt != null ? styles.taskDone : {}
	const date = props.doneAt ? props.doneAt : props.estimateAt
	const formattedDate = moment(date)
		.locale('pt-br')
		.format('ddd, D [de] MMMM')

	const getRightContent = () => {
		return (
			<TouchableOpacity
				style={styles.right}
				onPress={() => props.onDelete(props.id)}>
				<Icon name="trash" size={30} color="#FFF" />
			</TouchableOpacity>
		)
	}
	const getLeftContent = () => {
		return (
			<View style={styles.left}>
				<Icon name="trash" size={20} color="#FFF" style={styles.excludeItem} />
				<Text style={styles.excludeText}>Excluir</Text>
			</View>
		)
	}
	return (
		<Swipeable
			renderLeftActions={getLeftContent}
			renderRightActions={getRightContent}
			onSwipeableLeftOpen={() => props.onDelete(props.id)}>
			<TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
				<View style={styles.container}>
					<View style={styles.checkContainer}>
						{getCheckView(props.doneAt)}
					</View>
					<View>
						<Text style={[styles.desc, doneOrNotSyle]}>{props.desc}</Text>
						<Text style={styles.date}>{formattedDate + ''}</Text>
						{/* <Text>{props.doneAt + ''}</Text> */}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Swipeable>
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
		backgroundColor: '#FFF',
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
	right: {
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
	},
	left: {
		flex: 1,
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
	},
	excludeItem: {
		marginLeft: 10,
	},
	excludeText: {
		fontFamily: commonStyles.fontFamily,
		color: '#FFF',
		fontSize: 20,
		margin: 10,
	},
})
