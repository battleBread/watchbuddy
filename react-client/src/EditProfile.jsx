import React, { Component } from 'react';
import $ from 'jquery';
import { Popup, Input, Table, Card, Item, Label, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      phonenumber: '',
      name:'',
      bio:'',
      newAvatar: '',
      userName: 'Devon',
      userNum: '1234567890',
	  avatar: 'https://i.imgur.com/bVhY86x.jpg',
	  bio: 'I created an account on Watch Potato so that I can watch my shows at specific times, have someone remind me to watch and even rate them!'
    }
    this.updateEverything = this.updateEverything.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    
    
  }
  
  handleChangeName(event) {
    this.setState({userName: event.target.value});
    console.log(this.state.userName)
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
    this.setState({newAvatar: event.target.value});
    console.log(this.state.newAvatar)
  }

  updateEverything() {

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
          <Form.Field id='form-input-control-name' control={Input} label='Name' placeholder={this.state.name} onChange={this.handleChangeName} />
          <Form.Field id='form-input-control-phoneNumber' control={Input} label='Phone Number' placeholder={this.state.userNum} onChange={this.handleChangeNumber} />
        </Form.Group>
        <Form.Field id='form-textarea-control-bio' control={Input} label='Bio' placeholder={this.state.bio} onChange={this.handleChangeBio}/>
        <Form.Field id='form-button-control-public' control={Button} content='Confirm' label='Submit Changes' />
      </Form>

    </Grid.Column>
  </Grid>

			</div>
      </Transition>
		)
	}

}

export default EditProfile;

/*

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