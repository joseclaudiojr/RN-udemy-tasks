import AnimatedLoader from 'react-native-animated-loader'
import React from 'react'
import {StyleSheet} from 'react-native'
import commonStyles from '../commonStyles'
export default class Loader extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<AnimatedLoader
				visible={this.props.isVisible}
				animationStyle={styles.lottie}
				speed={1}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: commonStyles.colors.today,
	},
	lottie: {
		width: 100,
		height: 100,
	},
})
