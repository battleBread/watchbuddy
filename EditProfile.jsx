import React, { Component } from 'react';
import $ from 'jquery';
import { Popup, Input, Table, Card, Item, Label, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      phonenumber: '',
      name: 'Devon',
      userNum: '1234567890',
	  avatar: 'https://i.imgur.com/bVhY86x.jpg',
	  bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!'
    }
    this.updateRating = this.updateRating.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }
  
  handleChange(event) {
    this.setState({phonenumber: event.target.value});
    console.log(this.state.phonenumber)
  }

  updateNumber() {
    //this will route to server to update the users Phone number for notifcations
    console.log('updating the users PHONENUMBER')
    let phonenum = this.state.phonenumber;
    //ajax call to server to update phonenum 
  }

  updateBio() {
    //this will route to server to update the users Bio
    console.log('updating the users bio')
  }

  updateProfilePic() {
    //this will route to server to update the users profile picture
    console.log('updating the users profile picture')

  }

  updateRating() {
    //this will route to server to update rating for user-movie/show
    console.log('updating show RATING!')
    
  }

  updateReview() {
    //this will route to server to update review for user-move/show
    console.log('updating show REVIEW!')
    
  }


//profile page should have two views [not logged in, logged in]
//if the user is not logged in, we should redirect the user to log in page
// if user is logged in, then the profile page will work

	render () {
		return (
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
            
          Current Number in use for Notifications: {this.state.userNum}
          <Input placeholder = 'Change Phone Number' onChange = { this.handleChange.bind(this) } /> 
          <Button size='mini' icon color ='black' onClick={this.updateNumber}>Update!</Button>

        </Item.Extra>
      </Item.Content>
    </Item>
    </Item.Group>
          

			</div>
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