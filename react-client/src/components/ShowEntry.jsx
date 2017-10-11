import React, { Component } from 'react';
import { Container, Image, List, Button, Icon, Grid } from 'semantic-ui-react';

class ShowEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Grid.Row>
        <Grid.Column width={3}>
          <Container>
          <Image src={this.props.show.image} size='huge' verticalAlign='middle'/>
          { this.props.loggedIn === 'true' && 
            <Button 
              fluid icon size='big' 
              inverted color='red' 
              onClick={() => {
                this.props.addShow();
                let showObj = {};
                showObj.id = this.props.show.id;
                showObj.name = this.props.show.name;
                this.props.getShow(showObj);
              }}>
              Add show <Icon name='add to calendar'/>
            </Button> }
          </Container>
        </Grid.Column>

      <Grid.Column width={5}>
        <ul style={{listStyle: 'none'}}>
          <li><h4>{this.props.show.name}</h4></li>
          <ul>{this.props.show.genres.map((genre, i) => <li key={i}>{genre}</li>)}</ul>
          <p></p>
          <li>{this.props.show.summary}</li>
          <p></p>
          <li>First aired: {this.props.show.firstAirDate}</li>
        </ul>
      </Grid.Column>

      <Grid.Column width={3}>
        <Container>
        <Image src={this.props.movie.image} size='huge' verticalAlign='middle'/>
        { this.props.loggedIn === 'true' && 
          <Button 
            fluid icon size='big' 
            inverted color='red' 
            onClick={() => {
              this.props.addShow(); //needs to be updated
              let showObj = {};
              showObj.id = this.props.movie.id;
              showObj.name = this.props.movie.name;
              this.props.getShow(showObj);
            }}>
            Add movie <Icon name='add to calendar'/>
          </Button> }
        </Container>
      </Grid.Column>

      <Grid.Column width={5}>
        <ul style={{listStyle: 'none'}}>
          <li><h4>{this.props.movie.name}</h4></li>
          <ul>{this.props.movie.genres.map((genre, i) => <li key={i}>{genre}</li>)}</ul>
          <p></p>
          <li>{this.props.movie.summary}</li>
          <p></p>
          <li>Release Date: {this.props.movie.firstAirDate}</li>
        </ul>
      </Grid.Column>

    </Grid.Row>)
  }
}

export default ShowEntry;