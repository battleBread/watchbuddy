import React, { Component } from 'react';
import ShowList from './components/ShowList.jsx';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Button, Image, Transition } from 'semantic-ui-react'
// import twil from '../server/twilio.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.sendTwil = this.sendTwil.bind(this);
  }

  sendTwil() {
    let number = '+14152354088';
    let name = 'Devon';
    let showName = 'Rick and Morty';
    console.log('twilio clicked');
    //twil.sendReminder(number, name, showName);
  }

  render () {
    return (<Container fluid>
      <Navbar changeView={this.props.changeView} getShowList={this.props.getShowList}/>
        <Transition animation='fade up' duration={2000} transitionOnMount={true}>
          <div>
            <Header as='h3' icon textAlign='center' inverted color='red'>
              <Header.Content>
                No time to catch up on your favorite TV show?
                <Header textAlign='center'>
                  WatchBuddy's got you covered
                </Header>
              </Header.Content>
            </Header>

            <Header as='h3' icon textAlign='center' inverted color='red'>
              <Icon name='add' circular />
              <Header.Content>
                Add a TV show
              </Header.Content>
            </Header>

            <Header as='h3' icon textAlign='center' inverted color='red'>
              <Icon name='checked calendar' circular />
              <Header.Content>
                WatchBuddy will find time in your busy schedule so you can get caught up
              </Header.Content>
            </Header>
          </div>
        </Transition>
      <ShowList showList={this.props.showList}/>
    </Container>);
  }
}

export default Home;