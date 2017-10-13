import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Message, Transition } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

/////////////////// INSERT ALL VARIABLES HERE ///////////////////

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class newCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: true,
      showSignOutButton: false,
      myEventsList: [
        {
          'title': 'All Day Event',
          'allDay': true,
          'start': new Date(2017, 9, 0),
          'end': new Date(2017, 9, 1)
        },
        {
          'title': 'Long Event',
          'start': new Date(2017, 9, 7),
          'end': new Date(2017, 9, 10)
        },
        {
          'title': 'DTS STARTS',
          'start': new Date(2017, 9, 13),
          'end': new Date(2017, 9, 20)
        },
        {
          'title': 'Some Event',
          'start': new Date(2017, 9, 9),
          'end': new Date(2017, 9, 9)
        },
      ]
    }
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }

  handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
  }

  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({
        showAuthButton: false,
        showSignOutButton: true
      })
    } else {
      this.setState({
        showAuthButton: true,
        showSignOutButton: false
      })
    }
  }

  componentDidMount(){
    this.handleClientLoad();
  }

  render () {
    let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
    let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
    return (<Transition animation='fade up' duration={1000} transitionOnMount={true}>
      <div>
      <Navbar
      loggedIn='true' 
      changeView = { this.props.changeView } 
      getShowList = { this.props.getShowList } />

        <Container>

          <div>
            <Header as='h3' textAlign='center'>
              <Icon name='calendar'/> Your Calendar
            </Header>
            <div className="container">
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
      </div>
            <BigCalendar
              {...this.props}
              events={this.state.myEventsList}
              views={allViews}
              step={60}
              defaultDate={new Date(2017, 9, 1)}
              style={{height: 800}}
            />

            </div>
            </Container>
          </div>
        </Transition>);
  }
} 

export default newCalendar;


