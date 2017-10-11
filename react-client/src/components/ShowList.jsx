import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Image, List, Segment, Icon, Loader, Dimmer, Grid, Container } from 'semantic-ui-react'
import ShowEntry from './ShowEntry.jsx';

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

  componentWillReceiveProps({ showList, addedShowEpisodes, showSelected }) {
    this.setState({ showList, addedShowEpisodes, showSelected });
  }

  render() { 
    return (<div> { this.state.showSelected === 'true'
    ? <Segment inverted>
        <Container>
        <Button fluid icon size='big' inverted color='red'>
          { this.props.showName } <Icon name='checked calendar'/>
        </Button>
        </Container>
      </Segment> 
    : <div> { this.state.loaded === 'true' 
        ? <Segment inverted>
            <Grid celled>
              { this.state.showList.map((show, i) => <ShowEntry show={show} key={i} movie={this.state.movieList[i]} getShow={this.props.getShow} loggedIn={this.props.loggedIn} addShow={this.props.addShow}/>) }
            </Grid>
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