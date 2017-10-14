import React, { Component } from 'react';
import $ from 'jquery';
import { Popup, Input, Table, Card, Item, Label, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      userName: 'Devon',
      userNum: '1234567890',
      avatar: 'https://i.imgur.com/bVhY86x.jpg',
	    bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!'
    }
    this.updateEverything = this.updateEverything.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    
    
  }
  
  handleChangeBio(event) {
    this.setState({bio: event.target.value});
    console.log(this.state.bio)
  }
  handleChangeNumber(event) {
    this.setState({userNum: event.target.value});
    console.log(this.state.userNum)
  }
  handleChangeAvatar(event) {
    this.setState({avatar: event.target.value});
    console.log(this.state.avatar)
  }

  updateEverything() {
    console.log('updating everything')  
    //ajax call to /user/username/update
    //send as an object to update the users information.
  console.log('this is num: ', this.state.userNum);
  console.log('this is bio: ', this.state.bio);
  console.log('this is avatar: ', this.state.avatar);

  }

	render () {
		return (
      <Transition animation='fade up' duration={2000} transitionOnMount={true}>      
			<div>
				<NavBar
				loggedIn='true' />	

        <Grid>
          <Grid.Column floated='right' width={5}>
            <Card>
              <Image src={this.state.avatar} />
            <Card.Content>
              <Card.Header>{this.state.userName}</Card.Header>
              <Card.Meta>Joined in 2017</Card.Meta>
              <Card.Description>{this.state.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='call' />
                {this.state.userNum}
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column floated='left'  width={10}>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field id='form-input-control-phoneNumber' control={Input} label='Phone Number' placeholder={this.state.userNum} onChange={this.handleChangeNumber} />
            </Form.Group>
            <Form.Field id='form-textarea-control-avatar' control={Input} label='Avatar' placeholder={this.state.avatar} onChange={this.handleChangeAvatar}/>
            <Form.Field id='form-textarea-control-bio' control={Input} label='Bio' placeholder={this.state.bio} onChange={this.handleChangeBio}/>
            <Form.Field id='form-button-control-public' control={Button} content='Confirm' label='Submit Changes' onClick={this.updateEverything} />
          </Form>
        </Grid.Column>
      </Grid>
		</div>
    </Transition>
		)
	}
}

export default EditProfile;

