import React, { Component } from 'react';
import ShowList from './components/ShowList.jsx';
import Navbar from './components/Navbar.jsx';
import { Container, Header, Icon, Button, Image, Transition, Grid, Divider } from 'semantic-ui-react'


class Home extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (<Container fluid>
      <Navbar changeView={this.props.changeView} getShowList={this.props.getShowList}/>
        <Transition animation='fade up' duration={2000} transitionOnMount={true}>
          <div>
          <Divider hidden></Divider> 
          <Grid>
            <Grid.Column width={3}>
              <Image src='http://www.redgem.com.au/NEW/wp-content/uploads/2017/02/potato.jpg' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h3' icon textAlign='center' inverted color='orange'>
                <Header.Content>
                    No time to catch up on your favorite TV show?
                    <Header textAlign='center'>
                    WatchPotato's got you covered
                    </Header>
                </Header.Content>
              </Header>
            <Divider hidden></Divider>
            <Grid centered columns={3}>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' inverted color='orange'>
                <Icon name='add' circular />
                <Header.Content>
                  Add a TV Show or Movie
                </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' inverted color='orange'>
                <Icon name='checked calendar' circular />
                <Header.Content>
                  Schedule your Shows
                </Header.Content>
                </Header>      
              </Grid.Column>    
              <Grid.Column>
                <Header as='h3' icon textAlign='center' inverted color='orange'>
                <Icon name='tv' circular />
                <Header.Content>
                  Watch your Shows!
                </Header.Content>
                </Header>      
              </Grid.Column>   
            </Grid>
            </Grid.Column>
          </Grid>

          </div>
        </Transition>
      <Divider hidden></Divider>
      <ShowList showList={this.props.showList} movieList={this.props.movieList} />
    </Container>);
  }
}

export default Home;