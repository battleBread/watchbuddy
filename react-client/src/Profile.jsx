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
			bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!',
			ratedShowsMovies: data
    }
    this.scheduleShow = this.scheduleShow.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  editProfile() {
    console.log('redirecting the user to edit profile');
    this.props.changeView('EditProfile');
  }
  
  scheduleShow() {
    console.log('SCHEDULING show!');
  }

  goToHome(){
    this.props.changeView('UserHome');
  }

  componentWillMount() {
    console.log('mounted');
    console.log(this.props.userAvatarUrl)
  }

	render () {
		return (
      <Transition animation='fade up' duration={1500} transitionOnMount={true}>
			<div>
				<NavBar
				loggedIn='true' />	
        <Item.Group divided>
        <Item>
      <Item.Image src={this.props.userAvatarUrl} />
      <Item.Content>
        <Item.Header> Welcome, {this.props.userName}</Item.Header>
        <Item.Meta>
          <span className='years'>Joined in 2017</span>
        </Item.Meta>
        <Item.Description>{this.props.userBio}</Item.Description>
        <Item.Extra>
          <Container>
          Current Number in use for Notifications: <strong>{this.props.userNumber}</strong>
          <li>Notifications are {this.props.userNotification === true ? <Icon name = 'toggle on' className = 'icon' /> : <Icon name = 'toggle off' className = 'icon' /> }</li>
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
