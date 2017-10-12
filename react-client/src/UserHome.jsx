import React, { Component } from 'react';
import ShowList from './components/ShowList.jsx';
import Navbar from './components/Navbar.jsx';
import AddShow from './components/AddShow.jsx';
import AddMovie from './components/AddMovie.jsx';
import { Container, Header, Icon, Message, Transition, Button } from 'semantic-ui-react'

class UserHome extends Component {
  constructor(props) {
  	super(props);
    this.state = {
      showSelected: 'false',
      isTVShow: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      showId: nextProps.showId,
      showSelected: nextProps.showSelected,
      isTVShow: nextProps.isTVShow
    });
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
              <Icon name='film'/> Welcome!
            </Header>

            <Message>
              <Message.Header>
                Get started
              </Message.Header>
              <p>We see you haven't added a TV show yet. Search for your favorite TV show and click the calendar icon to add it to your watch list!</p>
            </Message>

            <div>
            <Button onClick={()=>{this.props.changeView('Calendar')}}><Icon name='calendar'/>VIEW CALENDAR</Button>
            </div>
            
            <ShowList 
              getShow = { this.props.getShow } 
              getMovie = {this.props.getMovie }
              showList = { this.props.showList }
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
            : null}
            </div>
            </Container>
          </div>
        </Transition>);
  }
}

export default UserHome;