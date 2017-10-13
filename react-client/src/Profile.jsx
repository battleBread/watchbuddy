import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Devon',
			avatar: 'https://i.imgur.com/bVhY86x.jpg',
			bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!',
			ratedShowsMovies: ['the matrix', 'lion king', 'gladiator']
		}
	}
	render () {
		return (
			<div>
				<NavBar
				loggedIn='true' />	

				<Grid columns={2} divided>
				  <Grid.Row>
			  		<Grid.Column>
				      <Image src={this.state.avatar}/>
					  Profile Picture
			       </Grid.Column>
			       <Grid.Column>
				   	  <Container>
			          <Message>
                  <Message.Header>
                  Welcome back, {this.state.name}
                  </Message.Header>
                  <p>{this.state.bio}</p>
                </Message>
			        </Container>
			       </Grid.Column>
			      </Grid.Row>
		  		</Grid>



			




			</div>
		)
	}

}

export default Profile;

