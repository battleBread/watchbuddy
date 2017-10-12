import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Message, Transition } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class newCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEventsList: []
    }
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

            <BigCalendar
              {...this.props}
              events={this.state.myEventsList}
              views={allViews}
              step={60}
              defaultDate={new Date(2015, 3, 1)}
              style={{height: 800}}
            />

            </div>
            </Container>
          </div>
        </Transition>);
  }
} 

export default newCalendar;


