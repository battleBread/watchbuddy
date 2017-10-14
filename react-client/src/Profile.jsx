import React, { Component } from 'react';
import $ from 'jquery';
import { Popup, Input, Table, Card, Item, Label, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      notification: true,
      phonenumber: '',
      name: 'Devon',
      userNum: '1234567890',
			avatar: 'https://i.imgur.com/bVhY86x.jpg',
			bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!',
			ratedShowsMovies: data
    }
    this.scheduleShow = this.scheduleShow.bind(this);
    this.toggleNotificationOn = this.toggleNotificationOn.bind(this);
    this.toggleNotificationOff = this.toggleNotificationOff.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  editProfile() {
    console.log('redirecting the user to edit profile');
    this.props.changeView('EditProfile');
  }
  
  scheduleShow() {
    console.log('SCHEDULING show!');
  }
  toggleNotificationOff() {
    this.setState({
      notification: false
    })
    console.log('Notifications are OFF');
  }
  toggleNotificationOn() {
    this.setState({
      notification: true
    })
    console.log('Notifications are ON');
  }

	render () {
		return (
      <Transition animation='fade up' duration={1500} transitionOnMount={true}>
			<div>
				<NavBar
				loggedIn='true' />	
        <Item.Group divided>
        <Item>
      <Item.Image src={this.state.avatar} />
      <Item.Content>
        <Item.Header> Welcome, {this.state.name}</Item.Header>
        <Item.Meta>
          <span className='years'>Joined in 2017</span>
        </Item.Meta>
        <Item.Description>{this.state.bio}</Item.Description>
        <Item.Extra>
          <Container>
          Current Number in use for Notifications: <strong>{this.state.userNum}</strong>
          <li>Notifications are {this.state.notification === true ? <Icon name = 'toggle on' className = 'icon' /> : <Icon name = 'toggle off' className = 'icon' /> }</li>
          </Container>
          <Button.Group>
            <Button onClick={this.toggleNotificationOff}>Notifications Off</Button>
            <Button.Or />
            <Button onClick={this.toggleNotificationOn} positive>Notifcations On</Button>
          </Button.Group>
          <Button onClick={this.editProfile}>Edit Profile &nbsp; 
              <Icon name = 'edit' className = 'icon'  />
          </Button>
          <Button onClick={this.goToHome.bind(this)}>Home</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
    </Item.Group>
          <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Movie Poster</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Your Rating</Table.HeaderCell>
              <Table.HeaderCell>Watch again!</Table.HeaderCell>
              <Table.HeaderCell>Your Review</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>

            {this.state.ratedShowsMovies.map(movie => 
                <Table.Row>
                  <Table.Cell>
                  <Image src={movie.poster}/>
                  </Table.Cell>
                  <Table.Cell singleLine>{movie.title}</Table.Cell>
                  <Table.Cell>
                    <Rating icon='star' defaultRating={movie.rating} maxRating={5} />
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    <Button icon color ='blue' onClick={this.scheduleShow}> Schedule </Button>
                  </Table.Cell>
                  <Table.Cell>
                    {movie.review}
                  </Table.Cell>
                </Table.Row>
            )}

          </Table.Body>
        </Table>

			</div>
      </Transition>
		)
	}

}

export default Profile;

/*
				   	  <Container>
			          <Message> 
                  <Message.Header>
                  Welcome back, {this.state.name}
                  </Message.Header>
                  <p>{this.state.name}'s Bio</p>
                  <p>{this.state.bio}</p>
                </Message>
              </Container>


				<Grid columns={2} divided>
				  <Grid.Row>
			  		<Grid.Column>
              <Card>
                <Image src= {this.state.avatar} />
                <Card.Content>
                  <Card.Header>
                    {this.state.name}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Joined in 2017
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    {this.state.bio}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
			       </Grid.Column>
			       <Grid.Column>


			       </Grid.Column>
			      </Grid.Row>
		  		</Grid>


                    <Input placeholder = 'Change Phone Number' onChange = { this.handleChange.bind(this) } /> 
          <Button size='mini' icon color ='black' onClick={this.updateNumber}>Update!</Button>

*/