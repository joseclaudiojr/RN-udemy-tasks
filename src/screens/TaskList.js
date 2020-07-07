import 'moment/locale/pt-br'

import {
	Alert,
	ImageBackground,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, {Component} from 'react'

import AddTask from './AddTask'
import {FlatList} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {SafeAreaView} from 'react-navigation'
import Task from '../components/Task'
import commonStyles from '../commonStyles'
import moment from 'moment'
import todayImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {
	state = {
		showDoneTasks: true,
		showAddTask: false,
		visibleTasks: [],
		tasks: [
			{
				id: Math.random(),
				desc: 'Comprar Livro de RN',
				estimateAt: new Date(),
				doneAt: new Date(),
			},
			{
				id: Math.random(),
				desc: 'Ler Livro de RN',
				estimateAt: new Date(),
				doneAt: null,
			},
		],
	}

	componentDidMount = () => {
		this.filterTasks()
	}

	toggleFilter = () => {
		this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
	}

	toggleTask = taskId => {
		const tasks = [...this.state.tasks]
		tasks.forEach(task => {
			if (task.id === taskId) {
				task.doneAt = task.doneAt ? null : new Date()
			}
		})
		this.setState({tasks}, this.filterTasks)
	}

	filterTasks = () => {
		let visibleTasks = null
		if (this.state.showDoneTasks) {
			visibleTasks = [...this.state.tasks]
		} else {
			const pending = task => task.doneAt === null
			visibleTasks = this.state.tasks.filter(pending)
		}
		this.setState({visibleTasks})
	}

	addTask = newTask => {
		if (!newTask.desc || !newTask.desc) {
			Alert.alert('Dados Inválidos', 'Descrição não informada!')
			return false
		}
		const tasks = [...this.state.tasks]
		tasks.push({
			id: Math.random(),
			desc: newTask.desc,
			estimateAt: newTask.date,
			doneAt: null,
		})
		this.setState({tasks, showAddTask: false}, this.filterTasks)
		return true
	}

	deleteTask = id => {
		const tasks = this.state.tasks.filter(task => task.id !== id)
		this.setState({tasks}, this.filterTasks)
	}

	render() {
		const today = moment()
			.locale('pt-br')
			.format('ddd, D [de] MMMM')
		return (
			<>
				{/* <SafeAreaView /> */}
				<View style={styles.container}>
					<AddTask
						isVisible={this.state.showAddTask}
						onCancel={() => this.setState({showAddTask: false})}
						onSave={this.addTask}
					/>
					<ImageBackground source={todayImage} style={styles.background}>
						<View style={styles.iconBar}>
							<TouchableOpacity onPress={this.toggleFilter}>
								<Icon
									name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
									size={20}
									color={commonStyles.colors.secondary}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.titleBar}>
							<Text style={styles.title}>Hoje</Text>
							<Text style={styles.subtitle}>{today}</Text>
						</View>
					</ImageBackground>
					<View style={styles.taskList}>
						<FlatList
							data={this.state.visibleTasks}
							keyExtractor={item => `${item.id}`}
							renderItem={({item}) => (
								<Task
									{...item}
									onToggleTask={this.toggleTask}
									onDelete={this.deleteTask}
								/>
							)}
						/>
					</View>
					<TouchableOpacity
						style={styles.addButton}
						onPress={() => this.setState({showAddTask: true})}
						activeOpacity={0.7}>
						<Icon name="plus" size={20} color={commonStyles.colors.secondary} />
					</TouchableOpacity>
				</View>
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 3,
	},
	taskList: {
		flex: 7,
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		fontSize: 50,
		color: commonStyles.colors.secondary,
		marginLeft: 20,
		marginBottom: 20,
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 20,
	},
	iconBar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: 20,
		marginTop: Platform.OS === 'ios' ? 40 : 10,
	},
	addButton: {
		position: 'absolute',
		right: 30,
		bottom: 30,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: commonStyles.colors.today,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
