import React, { Component } from 'react';
import $ from 'jquery';
import { Table, Card, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Devon',
			avatar: 'https://i.imgur.com/bVhY86x.jpg',
			bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!',
			ratedShowsMovies: data
    }
    this.updateRating = this.updateRating.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.scheduleShow = this.scheduleShow.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    
  }
  
  updateNumber() {
    //this will route to server to update the users Phone number for notifcations
    console.log('updating the users PHONENUMBER')
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

  scheduleShow() {
    console.log('SCHEDULING show!')
  }

//profile page should have two views [not logged in, logged in]
//if the user is not logged in, we should redirect the user to log in page
// if user is logged in, then the profile page will work

	render () {
		return (
			<div>
				<NavBar
				loggedIn='true' />	

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
				   	  <Container>
			          <Message> 
                  <Message.Header>
                  Welcome back, {this.state.name}
                  </Message.Header>
                  <p>{this.state.name}'s Bio</p>
                  <p>{this.state.bio}</p>
                </Message>
			        </Container>

			       </Grid.Column>
			      </Grid.Row>
		  		</Grid>
          //celled padded or celled selectable, you can choose via semantic react ui page for your preferences
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
		)
	}

}

export default Profile;

