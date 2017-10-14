import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Image, List, Segment, Icon, Loader, Dimmer, Grid, Container, Tab } from 'semantic-ui-react'
import ShowEntry from './ShowEntry.jsx';
import MovieTvTab from './MovieTvTab.jsx';

class ShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 'false',
      showList: [{
        firstAirDate: '2000-01-01',
        genres: ['Daniel'],
        image: '',
        summary: 'Default summary'
      }],
      movieList: [{
        firstAirDate: '2000-01-01',
        genres: ['Daniel'],
        image: '',
        summary: 'Default summary'
      }],
      addedShowEpisodes: [],
      addedMovies: [],
      showSelected: 'false'
    };
  }

  componentDidMount() {
    this.setState({ showList: this.props.showList });
    $.ajax({
      url: '/recommend',
      method: 'GET',
      contentType: 'application/json',
      success: data => this.setState({ showList: data.tv, movieList: data.movie, loaded: 'true' })
    });
  }

  componentWillReceiveProps({ showList, movieList, addedShowEpisodes, showSelected }) {
    this.setState({ showList, movieList, addedShowEpisodes, showSelected });
  }

  render() { 
    return (<div> { this.state.showSelected === 'true'
    ? <Segment inverted color='grey'>
        <Container>
        <Button fluid icon size='big' color='orange'>
          { this.props.showName } <Icon name='checked calendar'/>
        </Button>
        </Container>
      </Segment> 
    : <div> { this.state.loaded === 'true' 
        ? <Segment inverted>
            <MovieTvTab showList={this.state.showList} movieList={this.state.movieList} getShow={this.props.getShow} getMovie={this.props.getMovie} loggedIn={this.props.loggedIn} addShow={this.props.addShow} />
          </Segment> 
      : <Segment>
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        </Segment>}
      </div>
    }      
    </div>)
  }
} 

export default ShowList;