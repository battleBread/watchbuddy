import React, { Component } from 'react';
import { Input, Menu, Button, Icon } from 'semantic-ui-react';
import $ from 'jquery';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: 'false',
      term: ''
    }
  }

  componentWillMount() {
    if (this.props.loggedIn === 'true') {
      this.setState({loggedIn: 'true'});
    }
  }

  handleChange(event) {
    this.setState({term: event.target.value});
  }

  handleSubmit(event) {
    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({term: this.state.term}),
      success: data => {
        console.log(data);
        this.props.getShowList(data)
      },
      error: data => console.log('err from search submit')
    });
  }

  goToProfilePage() {
    console.log('profile clicked');
    this.props.changeView('Profile');
  }

  render () {
    return (

      <Menu className = "ui inverted menu" inverted color='red'>

        <Menu.Item>
          <h2><Icon name = 'film' /> <Icon name = 'child' /> WatchPotato</h2>
        </Menu.Item>
        <Menu.Item>
        <Button icon color ='black' onClick={this.goToProfilePage.bind(this)}> Go to Profile </Button>
        </Menu.Item>
        <Menu.Menu position = 'right'>
          <Menu.Item>
          
            <Input placeholder = 'Search...' onChange = { this.handleChange.bind(this) } />
            <Button icon color = 'black'>
              <Icon name = 'search' className = 'icon' onClick = { this.handleSubmit.bind(this) } />
            </Button>

          </Menu.Item>

          { this.state.loggedIn === 'true' 
            ? <Menu.Item>
                <Button onClick = { () => {this.props.changeView('Home')} } >Logout</Button>
              </Menu.Item>
            : <Menu.Item>
                <Button color = 'black' onClick = { () => {this.props.changeView('Login')} }>Log-in</Button>
              </Menu.Item>
          }
          
        </Menu.Menu>

      </Menu>);
  }
}

export default Navbar;