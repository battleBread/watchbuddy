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
          { this.props.loggedIn === 'true' && this.props.isTVShow ? 
            <Button 
              fluid icon size='big' 
              inverted color='red' 
              onClick={() => {
                this.props.addShow();
                let showObj = {};
                showObj.id = this.props.show.id;
                showObj.name = this.props.show.name;
                showObj.isTVShow = this.props.isTVShow;
                console.log(showObj);
                this.props.getShow(showObj);
              }}>
              Add show <Icon name='add to calendar'/>
            </Button> 
          : this.props.loggedIn === 'true' ? 
            <Button 
              fluid icon size='big' 
              inverted color='red' 
              onClick={() => {
                this.props.addShow();
                let movieObj = {};
                movieObj.id = this.props.show.id;
                movieObj.name = this.props.show.name;
                movieObj.isTVShow = this.props.isTVShow;
                console.log(movieObj);
                this.props.getMovie(movieObj); //currently not working
              }}>
              Add movie <Icon name='add to calendar'/>
            </Button>  
            : null}
          </Container>
        </Grid.Column>

      <Grid.Column width={13}>
        <ul style={{listStyle: 'none'}}>
          <li><h4>{this.props.show.name}</h4></li>
          <ul>{this.props.show.genres.map((genre, i) => <li key={i}>{genre}</li>)}</ul>
          <p></p>
          <li>{this.props.show.summary}</li>
          <p></p>
          <li>{this.props.isTVShow ? 'First aired: ' : 'Released: '} {this.props.show.firstAirDate}</li>
        </ul>
      </Grid.Column>
    </Grid.Row>)
  }
}

export default ShowEntry;