import React, { Component } from 'react';
import $ from 'jquery';
import { Popup, Input, Table, Card, Item, Label, Rating, Container, Button, Form, Grid, Header, Image, Message, Segment, Icon, Transition, Divider, TextArea } from 'semantic-ui-react';
import NavBar from './components/Navbar.jsx';
import data from './sampleData.js';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      userName: this.props.userName,
      userNum: this.props.userNumber,
      avatarUrl: this.props.userAvatarUrl,
      bio: this.props.userBio,
      notifications: this.props.userNotifications
    }
    this.updateEverything = this.updateEverything.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.toggleNotificationOff = this.toggleNotificationOff.bind(this);
    this.toggleNotificationOn = this.toggleNotificationOn.bind(this);
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
    this.setState({avatarUrl: event.target.value});
    console.log(this.state.avatarUrl)
  }

  goToHome() {
    console.log('Going Home');
    this.props.changeView('UserHome');
  }

  toggleNotificationOff() {
    this.setState({
      notifications: false
    })
    console.log('Notifications are OFF');
    //ajax call to update user/username/update notifications boolean
  }
  toggleNotificationOn() {
    this.setState({
      notifications: true
    })
    console.log('Notifications are ON');
    //ajax call to update user/username/update notifications boolean
  }

  updateEverything() {
    console.log('updating everything')  
    //ajax call to /user/username/update
    //send as an object to update the users information.
  console.log('this is num: ', this.state.userNum);
  console.log('this is bio: ', this.state.bio);
  console.log('this is avatar: ', this.state.avatarUrl);
  console.log('this is notications: ', this.state.notifications);

    $.ajax({
      method: 'POST',
      url: `/update/${this.state.userName}`,
      contentType: 'application/json',
      data: JSON.stringify({
        phone: this.state.userNum,
        avatarUrl: this.state.avatarUrl,
        notifications: this.state.notifications,
        bio: this.state.bio,
      }),
      success: 
        console.log(data)
        })
        
      // data => {
        // this.props.getPostAddShowData(data);
        // this.props.changeView('DisplaySchedule');
      // }
    
    this.props.getUsername(this.state.userName)
    //it would be better to have a promise here ( call getUsername THEN change the view)
    setTimeout(()=>{this.props.changeView('Profile')},400)}

	render () {
		return (
      <Transition animation='fade up' duration={1500} transitionOnMount={true}>      
			<div>
				<NavBar
				loggedIn='true' changeView ={this.props.changeView} />	

        <Grid>
          <Grid.Column floated='right' width={5}>
            <Card>
              <Image src={this.state.avatarUrl} />
            <Card.Content>
              <Card.Header>{this.props.userName}</Card.Header>
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
            <Container>
              <div>
                <p>Current Number for Notifications: <strong>{this.state.userNum}</strong></p>
                <p>Current Bio: {this.state.bio}</p>
                <p>Notifications are currently: {this.state.notifications === true ? ' ON' : ' OFF'}</p>
              </div>
              <Divider hidden/>
              <Form>
              <Form.Group widths='equal'>
                <Form.Field id='form-input-control-phoneNumber' control={Input} label='Update Phone Number' placeholder={this.state.userNum} onChange={this.handleChangeNumber} />
                </Form.Group>
              </Form>
              <Form>
                <Form.Field id='form-textarea-control-avatar' control={Input} label='Update Avatar' placeholder='Paste link here' onChange={this.handleChangeAvatar}/>
                <Form.Field id='form-textarea-control-bio' control={TextArea} label='Update Bio' placeholder='Tell us about yourself!' onChange={this.handleChangeBio}/>
              </Form>

            </Container>

          <Divider hidden/>
          
          <Button.Group>
            <Button onClick={this.toggleNotificationOff}>Notifications Off</Button>
            <Button.Or />
            <Button onClick={this.toggleNotificationOn} positive>Notifcations On</Button>
          </Button.Group>

          <Divider hidden/>

          <Container>
            <Button id='form-button-control-public' onClick={this.updateEverything} color='blue'>Update Profile</Button>
            <Button onClick={this.goToHome.bind(this)}>Home</Button>
          </Container>
        </Grid.Column>
      </Grid>
		</div>
    </Transition>
		)
	}
}

export default EditProfile;

