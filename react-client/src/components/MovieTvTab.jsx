import React, { Component } from 'react'
import { Menu, Grid, Segment, Label } from 'semantic-ui-react'
import ShowEntry from './ShowEntry.jsx'

class MovieTvTab extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)
    this.state = {
      activeItem: 'TV'
    }
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary widths={3}>
          <Menu.Item name='TV' active={activeItem === 'TV'} onClick={this.handleItemClick}>
            TV <Label color='orange'>{this.props.showList.length}</Label>
          </Menu.Item>
          <Menu.Item name='movies' active={activeItem === 'movies'} onClick={this.handleItemClick}>
            Movies <Label color='orange'>{this.props.movieList.length}</Label>
          </Menu.Item>
        </Menu>
        <div> {activeItem === 'TV'
          ? <Grid divided='vertically' >
              { this.props.showList.map((show, i) => <ShowEntry show={show} key={i} getShow={this.props.getShow} loggedIn={this.props.loggedIn} addShow={this.props.addShow} isTVShow={true}/>) }
            </Grid>
          : <Grid divided='vertically' >
              { this.props.movieList.map((show, i) => <ShowEntry show={show} key={i} getMovie={this.props.getMovie} loggedIn={this.props.loggedIn} addShow={this.props.addShow} isTVShow={false}/>) }
            </Grid>}
        </div>
      </div>
    )
  }
}

export default MovieTvTab;