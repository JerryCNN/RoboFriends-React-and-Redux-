import CardList from './CardList';
import {connect} from 'react-redux';
import React from 'react';
import SearchBox from './SearchBox';
import './App.css';
import Scroll from './Scroll'
import {setSearchField, requestRobots} from './actions'


const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error:state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange:(event) => dispatch(setSearchField(event.target.value)),
		onrequestrobots:() => dispatch(requestRobots())
	}
}


class App extends React.Component {

	componentDidMount() {
		this.props.onrequestrobots();
	}


	render(){
		const {searchField, onSearchChange, robots} = this.props

		const filteredrobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

		return(
		<div className ='tc'>
			<h1 className ='f2'>RoboFriends</h1>
			<SearchBox searchchange = {onSearchChange}/>
			<Scroll>
   				<CardList robots = {filteredrobots}/>
   			</Scroll>
    	</div>
		)
	}
	
}


export default connect(mapStateToProps,mapDispatchToProps)(App);