import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import UserHome from './UserHome.jsx';
import Profile from './Profile.jsx';
import EditProfile from './EditProfile.jsx';
import DisplaySchedule from './DisplaySchedule.jsx';
import Calendar from './Calendar.jsx'
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: 'Home',
      userBio: '',
      userAvatarUrl: '',
      userNumber: '',
      userNotifications: false,
      userShows: [],
      userMovies: [],
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
      showSelected: 'false',
      showId: '',
      showName: '',
      addedShowEpisodes: [],
      addedMovie: {},
      PostAddShowData: {},
      isTVShow: false
    };
    this.setState = this.setState.bind(this);
  }

  changeView(option) {
    this.setState({ view: option });
  }

  updateProfile(bio, avatar, number) {
    this.setState({
      userBio: bio,
      userAvatarUrl: avatar,
      number: number
    })
    console.log('update profile initiated')
  }

  getUsername(username) {
    this.setState({ username });
    console.log('username: ', username)

    $.ajax({
      url: `/user/${username}`,
      method: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({username: this.state.username}),
      success: (data) => 
      // this.setState({
      //   userBio: data.info.bio,
      //   userAvatarUrl: data.info.avatarUrl,
      //   userNotifications: data.info.notifications,
      //   userNumber: data.info.phone
      // })
      this.updateUserProfile(data)
      ,
      error: () => this.renderErrorMessage()
    });
  }

  updateUserProfile(data) {
    console.log('updating profile state')
    console.log('this is the data after signing logging in:',  data);
    console.log(data.info.phone)
    console.log(data.info.avatarUrl)
    
    this.setState({
      userBio: data.info.bio,
      userAvatarUrl: data.info.avatarUrl,
      userNotifications: data.info.notifications,
      userNumber: data.info.phone
    })
  }


  getShowList(data){
    this.setState({ showList: data.tv, movieList: data.movie })
  }

  addShow() {
    this.setState({ showSelected: 'true' });
  }

  getShow(showIdAndName) { //may need to make a getMovie ajax request
    let showId = showIdAndName.id;
    let showName = showIdAndName.name;
    let isTVShow = showIdAndName.isTVShow;
    this.setState({ showId, showName, isTVShow: isTVShow, showSelected: 'true' }) //this doesn't update state??
    $.ajax({
      url: '/add',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: showId }),
      success: data => this.setState({ addedShowEpisodes: data }),
      error: () => console.log('error getting show info')
    });
  }

  getMovie(movieIdAndName) {
    // console.log('called: ', movieIdAndName);
    let movieId = movieIdAndName.id;
    let movieName = movieIdAndName.name;
    let isTVShow = movieIdAndName.isTVShow;
    this.setState({ showId: movieId, showName: movieName, isTVShow: isTVShow, showSelected: 'true' })
    $.ajax({
      url: '/addmovie',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: movieId }),
      success: data => {
        console.log('data from getMovie:', data);
        // this.setState({ addedMovie: data })
      },
      error: () => console.log('error getting movie info')
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
        movieList = { this.state.movieList }
        addShow = { this.addShow.bind(this) }
        showSelected = { this.state.showSelected }
        changeView = { this.changeView.bind(this) }
        getShow = { this.getShow.bind(this) }
        getMovie = { this.getMovie.bind(this) }
        showName = { this.state.showName }
        showId = { this.state.showId }
        isTVShow = { this.state.isTVShow }
        addedShowEpisodes = { this.state.addedShowEpisodes }
        getPostAddShowData = { this.getPostAddShowData.bind(this) }
      />
    } else if (this.state.view === 'DisplaySchedule') {
      return <DisplaySchedule 
        loggedIn = 'true' 
        username = { this.state.username } 
        getShowList= { this.getShowList.bind(this) } 
        showList = { this.state.showList }
        movieList = { this.state.movieList }
        addShow = { this.addShow.bind(this) }
        showSelected = { this.state.showSelected }
        changeView = { this.changeView.bind(this) }
        getShow = { this.getShow.bind(this) }
        showName = { this.state.showName }
        PostAddShowData = { this.state.PostAddShowData }
      />
    } else if (this.state.view === 'Calendar') {
      return <Calendar 
        loggedIn = 'true' 
        changeView = { this.changeView.bind(this) } 
        username = { this.state.username } 
        changeView = { this.changeView.bind(this) }
        getShow = { this.props.getShow } 
        getMovie = { this.props.getMovie }
        isTVShow = { this.state.isTVShow }
        showList = { this.props.showList }
        movieList = { this.props.movieList }
        addedShowEpisodes = { this.state.addedShowEpisodes }
        showName = { this.props.showName }
        addShow = { this.props.addShow }
        showSelected = { this.props.showSelected }
      />
    } else if (this.state.view === 'Profile') {
      return <Profile
        changeView = { this.changeView.bind(this) } 
        userName = {this.state.username}
        userAvatarUrl = {this.state.userAvatarUrl}
        userBio = {this.state.userBio}
        userNumber = {this.state.userNumber}
        userNotifications = {this.state.userNotifications}
        userShows = {this.state.userShows}
        userMovies = {this.state.userMovies}
        getUsername = {this.getUsername}
      />
    } else if (this.state.view === 'EditProfile') {
      return <EditProfile
        changeView = { this.changeView.bind(this) }
        userName = {this.state.username}
        userAvatarUrl = {this.state.userAvatarUrl}
        userBio = {this.state.userBio}
        userNumber = {this.state.userNumber}
        userNotifications = {this.state.userNotifications} 
        getUsername = {this.getUsername.bind(this)}
      />
    } else if (this.state.view === 'Home') {
      return <Home 
        changeView = { this.changeView.bind(this) } 
        getShowList = { this.getShowList.bind(this) } 
        showList = { this.state.showList }
        movieList = { this.state.movieList }
      />
    }
  }

  render () {
    return (<div>{ this.getView() }</div>);
  }
}

ReactDOM.render( <App />, document.getElementById('app') );