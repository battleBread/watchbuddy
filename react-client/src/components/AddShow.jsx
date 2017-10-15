import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Form, Button, Checkbox, Dropdown, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import  _ from 'lodash';

class AddShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showId: this.props.showId,
      startDate: moment(),
      endDate: moment(),
      startDatejs: '',
      endDatejs: '',
      seasonOptions: [
        {
          text: 'Season 1',
          value: 'Default value'
        }
      ],
      episodeOptions: [
        {
          text: 'Episode 1',
          value: 'Default value'
        }
      ],
      hourOptions: [
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
        {text: 5, value: 5},
        {text: 6, value: 6},
        {text: 7, value: 7},
        {text: 8, value: 8},
        {text: 9, value: 9},
      ],
      originalSeasonObj: {},
      selectedSeason: '',
      selectedEpisode: '',
      selectedHour: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      username: '',
      runtime: 0
    };
  }

  componentWillReceiveProps(episodes) {
    //handle username
    this.setState({ username: episodes.username });

    //handle showId
    this.setState({ showId: episodes.showId });
    this.setState({ runtime: episodes.addedShowEpisodes.runtime})

    //handle show info
    //addedShowEpisodes is an object where each key has an array with elements:
      //[0] = number of episodes
      //[1] = season poster
    let seasonsObj = episodes.addedShowEpisodes.seasons;
    console.log(seasonsObj)
    this.setState({
      originalSeasonObj: seasonsObj,
      seasonsObj: seasonsObj});
    let seasonArr = [];
    let episodeArr = [];
    _.each(seasonsObj, (value, key, index) => {
      seasonArr.push({value: key, text: key, image: value[1]});
      episodeArr.push({key: key, value: value[0], text: value[0]});
    });
    this.setState({seasonOptions: seasonArr});
    this.setState({episodeOptions: episodeArr});
  }

  handleSubmit() {
    // create events array
    var today = new Date();
    var seasonObj = this.state.seasonsObj;
    var season = 1;
    // console.log(seasonObj[season.toString()]);

    var runtimeInHours = this.state.runtime / 60;
    var freeHours = this.state.selectedHour;
    var numEpisodesPerDay = Math.floor(freeHours / runtimeInHours);
    // console.log(numEpisodes)
    var nextEpisode = (season, episode) => {
      var numEpisodesInSeason = seasonObj[season.toString()][0];
      if (episode < numEpisodesInSeason) {
        return [season, episode + 1];
      } else {
        season = season + 1;
        if (seasonObj[season.toString()]) {
          return [season, 1];
        } else {
          return false;
        }
      }
    }
    // console.log(nextEpisode(Number(this.state.selectedSeason), Number(this.state.selectedEpisode)));
    var getEpisodesForDay = (season, episode) => {
      var episodes = [];
      var counter = 1;
      var episode = episode
      var season = season
      console.log(numEpisodesPerDay)
      while (counter <= numEpisodesPerDay) {
        if (episodes.length === 0) {
          // if (nextEpisode(season, episode)) {
          //   console.log('got here')
          //   episodes.push(nextEpisode(season, episode))
          // }
          episodes.push([season, episode])
          counter++
        } else {
          var lastScheduledSeason = episodes[episodes.length - 1][0];
          var lastScheduledEpisode = episodes[episodes.length - 1][1];
          if (nextEpisode(lastScheduledSeason, lastScheduledEpisode)) {
            console.log('got here too')
            episodes.push(nextEpisode(lastScheduledSeason, lastScheduledEpisode))
          }
          counter++
        }
      }
      return episodes;
    }
    console.log(getEpisodesForDay(Number(this.state.selectedSeason), Number(this.state.selectedEpisode)));
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //determine available days
    var availDays = [];
    days.forEach((day, index) => {
      if (this.state[day] === 1) {
        availDays.push(index)
      }
    })
    // console.log(availDays);

    var start = this.state.startDatejs;
    var end = this.state.endDatejs;
    var createEvents = (start, end, numEpisodesPerDay, seasonStr, episodeStr) => {
      // console.log('start date', this.state.startDatejs.getDate())
      // console.log('end date', JSON.stringify(this.state.endDatejs));
      var events = [];
      var startDate = start;
      var endDate = end;
      var season = Number(seasonStr);
      var episode = Number(episodeStr);
      for (var day = start.getDate(); day <= end.getDate(); day++) {
        if (availDays.includes(day.getDay())) {
          var episodes = getEpisodesForDay(season, episode);
          var title = episodes.map((pair) => {
            return `S${pair[0]}E${pair[1]}`
          }).join(', ')
          var event = {
            start: startDate,
            end: endDate,
            title: title
          }
          events.push(event)
        }
      }
      return events;  
    }



    //make ajax call to add with all info
    // $.ajax({
    //   method: 'POST',
    //   // url: '/addshow',
    //   url: `/user/${this.state.username}`,
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     shows:[{
    //       title: this.props.showName,
    //       movieDB: this.state.showId,
    //       // rating: 1, //Need to send this data to client first
    //       episodes: [{
    //         // title: this.state.selectedEpisode, //Need to get the episode name from movieDB
    //         // rating: 1, //Need to send this data to client first
    //         season: this.state.selectedSeason,
    //         episode: this.state.selectedEpisode, 
    //         runtime: this.state.runtime //Need to send this data to the client first
    //       }]
    //     }],
    //     events: [{
    //       title: `${this.props.showName} S${this.state.selectedSeason}E${this.state.selectedEpisode}`,
    //       start: this.state.startDatejs,
    //       end: this.state.startDatejs
    //     }]
    //     // restructure data below:
    //     // username: this.state.username,
    //     // showId: this.state.showId,
    //     // showName: this.props.showName,
    //     // season: this.state.selectedSeason,
    //     // episode: this.state.selectedEpisode,
    //     // startDate: this.state.startDatejs,
    //     // endDate: this.state.endDatejs,
    //     // monday: this.state.monday,
    //     // tuesday: this.state.tuesday,
    //     // wednesday: this.state.wednesday,
    //     // thursday: this.state.thursday,
    //     // friday: this.state.friday,
    //     // saturday: this.state.saturday,
    //     // sunday: this.state.sunday,
    //     // hours: this.state.selectedHour
    //   }),
    //   success: data => {
    //     this.props.getPostAddShowData(data);
    //     this.props.changeView('DisplaySchedule');
    //   },
    //   error: err => {console.log(err);}
    // });
  }

  handleDay(day){
    let setObj = {};
    if (this.state[day] === 0) {
      setObj[day] = 1;
      this.setState(setObj);
    } else {
      setObj[day] = 0;
      this.setState(setObj);
    }
  }

  handleSelectedSeason(event, { value }) {
    let valueNum = parseInt(value);
    this.setState({ selectedSeason: valueNum });

    //grab selected season
    let selectedValue = value;
    let episodeNum = 0;

    //get the corresponding num of episodes for the selected season
    _.each(this.state.originalSeasonObj, (value, key) => {
        if (key === selectedValue) {
          episodeNum = value[0];
        }
    });

    //populate episodeOptions with array of episodes
    let newEpisodeArr = [];
    _.times(episodeNum, (index) => {
      let epObj = {};
      epObj.text = index + 1;
      epObj.value = index + 1;
      newEpisodeArr.push(epObj);
    });
    this.setState({ episodeOptions: newEpisodeArr });
  }

  handleSelectedEpisode(event, { value }) {
    // let valueNum = parseInt(value)
    this.setState({ selectedEpisode: value })
  }

  handleSelectedHour(event, { value }) {
    this.setState({ selectedHour: value })
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    }, () => {
      let datejs = this.state.startDate.toDate()
      this.setState({ startDatejs: datejs })
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    }, () => {
      let datejs = this.state.endDate.toDate()
      this.setState({ endDatejs: datejs })
    });
  }

  render () {
    const { currentValues } = this.state
    return (
      <Container>
        <style>
          {`
            Button,
            Header,
            Form {
              padding-top: 10px;
            }
          `}
        </style>
        <Form>
          <Header as='h4' textAlign='left' inverted color='orange'>
            Where did you leave off?
          </Header>

          <Form.Field>
            <label>Season</label>
            <Dropdown 
              placeholder='Select season' 
              fluid selection 
              options={this.state.seasonOptions} 
              onChange={this.handleSelectedSeason.bind(this)} 
              value={currentValues}
            />
          </Form.Field>
          <Form.Field>
            <label>Episode</label>
            <Dropdown 
              placeholder='Select episode' 
              fluid selection 
              options = { this.state.episodeOptions } 
              onChange = { this.handleSelectedEpisode.bind(this)} 
              image = { currentValues }
              value = { currentValues }
            />
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Start date</label>
              <DatePicker
                selected = { this.state.startDate }
                onChange = { this.handleStartDateChange.bind(this) }
              />
            </Form.Field>
            <Form.Field>
              <label>End date</label>
              <DatePicker
                selected = { this.state.endDate }
                onChange = { this.handleEndDateChange.bind(this) }
              />
            </Form.Field>
          </Form.Group>

          <Header as='h4' textAlign='left' inverted color='orange'>
            Which days are you free?
          </Header>

          <Form.Group widths='equal'>
            <Form.Field>
              <Checkbox label='Monday' onClick = { () => this.handleDay('monday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Tuesday' onClick = { () => this.handleDay('tuesday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Wednesday' onClick = { () => this.handleDay('wednesday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Thursday' onClick = { () => this.handleDay('thursday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Friday' onClick = { () => this.handleDay('friday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Saturday' onClick = { () => this.handleDay('saturday') }/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Sunday' onClick = { () => this.handleDay('sunday') }/>
            </Form.Field>
          </Form.Group>

          <Header as='h4' textAlign='left' inverted color='orange'>
            How many hours per day?
          </Header>

          <Form.Field>
            <label>Hours</label>
            <Dropdown placeholder='Select number of hours' fluid selection 
              options = { this.state.hourOptions } 
              onChange = { this.handleSelectedHour.bind(this) } 
              value = { currentValues }
            />
          </Form.Field>

          <Button fluid color = 'blue' type = 'submit' onClick = { this.handleSubmit.bind(this) }>Submit</Button>
        </Form>
      </Container>
  );
  }
}

export default AddShow;