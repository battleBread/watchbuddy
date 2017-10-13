import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Message, Transition } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from './events.js'

/////////////////// INSERT ALL VARIABLES HERE ///////////////////
var CLIENT_ID = '36715810384-o7sedl5mq1ev11fhbjcjt5oacep7jek9.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const API_KEY = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp';
var onload="this.onload=function(){};handleClientLoad()";
var onreadystatechange="if (this.readyState === 'complete') this.onload()";
// var authorizeButton = document.getElementById('authorizeButton');
// console.log(authorizeButton)
// var signoutButton = document.getElementById('signoutButton');
var authorize = {display: 'block'};
var signout = {display: 'none'};

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class newCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: true,
      showSignOutButton: false,
      myEventsList: events,
    }
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.appendPre = this.appendPre.bind(this);
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    this.authorizeButton = document.getElementById('authorize-button');
    this.signoutButton = document.getElementById('signout-button');
  }

  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }
  
  initClient() {
    var test = this.updateSigninStatus;
    var auth = this.handleAuthClick;
    var signout = this.handleSignoutClick;
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');

    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(test);

        // Handle the initial sign-in state.
        test(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = auth;
        signoutButton.onclick = signout;
      });
    }

  updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');

    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      this.listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

  handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
  }

  appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  listUpcomingEvents() {
    var append = this.appendPre;
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      append('Upcoming events:');

      if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          append(event.summary + ' (' + when + ')')
        }
      } else {
        append('No upcoming events found.');
      }
    });
  }

  componentDidMount(){
    this.handleClientLoad();
  }

  render () {
    // let authButton = <button id="authorize-button" onClick={this.handleAuthClick}>Authorize</button>
    // let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick}>Sign Out</button>
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
          <Container>
            <button id="authorize-button" style={authorize} onClick={this.handleAuthClick}>Authorize</button>
            <button id="signout-button" style={signout}>Sign Out</button>
            <pre id="content"></pre>
          </Container>
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


