import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Form, Grid, Header, Segment, Icon, Transition } from 'semantic-ui-react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phone: '',
      avatarUrl: '',
    }
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleAvatarUrlChange(e) {
    this.setState({ avatarUrl: e.target.value });
  }

  handleSubmit() {
    const { username, password, phone, avatarUrl } = this.state;
    $.ajax({
      url: '/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 
        username,
        password,
        phone,
        avatarUrl,
      }),
      success: (data) => {
        this.props.getUsername(data);
        this.props.changeView('UserHome');
        }
    });
  }

  render() {
    return (<Transition animation='fade up' duration={1000} transitionOnMount={true}>
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}
        </style>
        <Grid
          textAlign = 'center'
          style = {{ height: '100%' }}
          verticalAlign = 'middle'>
          <Grid.Column style = {{ maxWidth: 450 }}>
            <Header as = 'h2' color = 'red' textAlign = 'center'>
              <div><Icon name = 'film' /> <Icon name = 'child' /> WatchBuddy</div>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  onChange = { this.handleUsernameChange.bind(this) }
                  fluid
                  icon = 'user'
                  iconPosition = 'left'
                  placeholder = 'Username'
                />
                <Form.Input 
                  onChange = { this.handlePasswordChange.bind(this) }
                  fluid
                  icon = 'lock'
                  iconPosition = 'left'
                  placeholder = 'Password'
                  type = 'password'
                />
                <Form.Input 
                  onChange = { this.handlePhoneChange.bind(this) }
                  fluid
                  icon = 'lock'
                  iconPosition = 'left'
                  placeholder = 'Phone # (optional)'
                />
                <Form.Input 
                  onChange = { this.handleAvatarUrlChange.bind(this) }
                  fluid
                  icon = 'lock'
                  iconPosition = 'left'
                  placeholder = 'Link to profile image (optional)'
                />
                <Button 
                  color = 'red'
                  fluid size = 'large'
                  onClick = { this.handleSubmit.bind(this) }>
                  Signup
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        </div>
      </Transition>)
    }
} 

export default Signup;