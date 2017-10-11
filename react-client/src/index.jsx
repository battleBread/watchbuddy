import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import UserHome from './UserHome.jsx';
import DisplaySchedule from './DisplaySchedule.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: 'Home',
      username: '',
      showList: [{
        firstAirDate: '2000-01-01',
        genres: ['Daniel'],
        image: '',
        summary: 'Default summary'
      }],
      showSelected: 'false',
      showId: '',
      showName: '',
      addedShowEpisodes: [],
      PostAddShowData: {}
    };
  }

  changeView(option) {
    this.setState({ view: option });
  }

  getUsername(username) {
    this.setState({ username });
  }

  getShowList(data){
    this.setState({ showList: data })
  }

  addShow() {
    this.setState({ showSelected: 'true' });
  }

  getShow(showIdAndName) { //may need to make a getMovie ajax request
    let showId = showIdAndName.id;
    let showName = showIdAndName.name;
    this.setState({ showId, showName, showSelected: 'true' })

    $.ajax({
      url: '/add',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: showId }),
      success: data => this.setState({ addedShowEpisodes: data }),
      error: () => console.log('error getting show info')
    });
  }

  getPostAddShowData(PostAddShowData) {
    this.setState({ PostAddShowData }, () => console.log(PostAddShowData));
  }

  getView() {
    if (this.state.view === 'Login') {
      return <Login 
        changeView = { this.changeView.bind(this) } 
        getUsername = { this.getUsername.bind(this) }
      />
    } else if (this.state.view === 'Signup') {
      return <Signup 
        changeView = { this.changeView.bind(this) } 
        getUsername = { this.getUsername.bind(this)
      }/>
    } else if (this.state.view === 'UserHome') {
      return <UserHome 
        loggedIn = 'true' 
        username = { this.state.username } 
        getShowList= { this.getShowList.bind(this) } 
        showList = { this.state.showList }
        addShow = { this.addShow.bind(this) }
        showSelected = { this.state.showSelected }
        changeView = { this.changeView.bind(this) }
        getShow = { this.getShow.bind(this) }
        showName = { this.state.showName }
        showId = { this.state.showId }
        addedShowEpisodes = { this.state.addedShowEpisodes }
        getPostAddShowData = { this.getPostAddShowData.bind(this) }
      />
    } else if (this.state.view === 'DisplaySchedule') {
      return <DisplaySchedule 
        loggedIn = 'true' 
        username = { this.state.username } 
        getShowList= { this.getShowList.bind(this) } 
        showList = { this.state.showList }
        addShow = { this.addShow.bind(this) }
        showSelected = { this.state.showSelected }
        changeView = { this.changeView.bind(this) }
        getShow = { this.getShow.bind(this) }
        showName = { this.state.showName }
        PostAddShowData = { this.state.PostAddShowData }
      />
    } else if (this.state.view === 'Home') {
      return <Home 
        changeView = { this.changeView.bind(this) } 
        getShowList = { this.getShowList.bind(this) } 
        showList = { this.state.showList }
      />
    }
  }

  render () {
    return (<div>{ this.getView() }</div>);
  }
}

ReactDOM.render( <App />, document.getElementById('app') );