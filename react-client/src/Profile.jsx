import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Devon',
			avatar: 'https://i.imgur.com/YV3EI8I.jpg',
			bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!',
			ratedShowsMovies: ['the matrix', 'lion king', 'gladiator']
		}
	}
	render () {
		return (
			<div>
				<NavBar
				loggedIn='true' />
				<div className='profilePicture'>
				Here is the profile picture
				<img src='https://i.imgur.com/YV3EI8I.jpg'/>
				</div>
				<div className='profileBio'>
				here is the profile bio
				{this.state.bio}
				</div> 
				Hello this is my profile page.
				{this.state.ratedShowsMovies}
			</div>
		)
	}

}

export default Profile;

