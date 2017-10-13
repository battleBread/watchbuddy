import React, { Component } from 'react';
import $ from 'jquery';
import { Table, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
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
  }
  
  updateRating() {
    //this will route to server to update rating for user-movie/show
  }

  updateReview() {
    //this will route to server to update review for user-move/show
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
                  <p>{this.state.name}'s Bio</p>
                  <p>{this.state.bio}</p>
                </Message>
			        </Container>

			       </Grid.Column>
			      </Grid.Row>
		  		</Grid>

          <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Movie Poster</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Your Rating</Table.HeaderCell>
              <Table.HeaderCell>MovieDB Ratings</Table.HeaderCell>
              <Table.HeaderCell>Your Review</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
            <Table.Row>
              <Table.Cell>
              <Image src={this.state.ratedShowsMovies[0].poster}/>
              </Table.Cell>
              <Table.Cell singleLine>{this.state.ratedShowsMovies[0].title}</Table.Cell>
              <Table.Cell>
                <Rating icon='star' defaultRating={this.state.ratedShowsMovies[0].rating} maxRating={5} />
              </Table.Cell>
              <Table.Cell textAlign='right'>
                  80% <br />
                <a href='#'>18 studies</a>
              </Table.Cell>
              <Table.Cell>
                {this.state.ratedShowsMovies[0].review}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
              <Image src={this.state.ratedShowsMovies[1].poster}/>
              </Table.Cell>
              <Table.Cell singleLine>{this.state.ratedShowsMovies[1].title}</Table.Cell>
              <Table.Cell>
                <Rating icon='star' defaultRating={this.state.ratedShowsMovies[1].rating} maxRating={5} />
              </Table.Cell>
              <Table.Cell textAlign='right'>
                  100% <br />
                <a href='#'>65 studies</a>
              </Table.Cell>
              <Table.Cell>
                {this.state.ratedShowsMovies[1].review}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

			</div>
		)
	}

}

export default Profile;

