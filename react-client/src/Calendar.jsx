import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Message, Transition, Button, Divider } from 'semantic-ui-react';
import ShowList from './components/ShowList.jsx';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from './events.js';
import keys from '../../config.js';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var onload="this.onload=function(){};handleClientLoad()";
var onreadystatechange="if (this.readyState === 'complete') this.onload()";
var authorize = {display: 'none'};
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
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    this.authorizeButton = document.getElementById('authorize-button');
    this.signoutButton = document.getElementById('signout-button');
    this.setState = this.setState.bind(this);
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
      clientId: keys.CLIENT_ID,
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

  listUpcomingEvents() {
    var append = this.appendPre;
    var state = this.state
    var setState = this.setState;
    var oldEvents = this.state.myEventsList;
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      var setEvents =  events.map((item) => (
        {
          'title': item.summary,
          'start': item.start.dateTime,
          'end': item.end.dateTime,
        }
      ))

      var combinedEvents = oldEvents.concat(setEvents);
      setState(
        {
          myEventsList: combinedEvents,
        }
      ); 
    });
  }

  componentDidMount(){
    this.handleClientLoad();
  }

  render () {
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
            <Button color='red' id="authorize-button" style={authorize} onClick={this.handleAuthClick}>
              Connect your Google Calendar
            </Button>
            <Button color='red' id="signout-button" style={authorize} onClick={this.handleSignoutClick}>
              Sign Out
            </Button>
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

          <Divider horizontal>Add More Shows</Divider>
          
          <ShowList 
              getShow = { this.props.getShow } 
              getMovie = { this.props.getMovie }
              isTVShow = { this.state.isTVShow }
              showList = { this.props.showList }
              movieList = { this.props.movieList }
              addedShowEpisodes = { this.state.addedShowEpisodes }
              showName = { this.props.showName }
              loggedIn = 'true'
              addShow = { this.props.addShow }
              showSelected = { this.props.showSelected }
            />
            {this.state.showSelected === 'true' && this.state.isTVShow ?
            <AddShow
              showId = { this.props.showId } 
              showName = { this.props.showName }
              addedShowEpisodes = { this.props.addedShowEpisodes }
              username = { this.props.username }
              changeView = { this.props.changeView }
              getPostAddShowData = { this.props.getPostAddShowData }
            />
            : this.state.showSelected === 'true' ?
              <AddMovie
                movieId = { this.props.showId } 
                movieName = { this.props.showName }
                username = { this.props.username }
                changeView = { this.props.changeView }
                getPostAddShowData = { this.props.getPostAddShowData }
              />
            : null}
          </Container>

        </div>
      </Transition>);
  }
} 

export default newCalendar;