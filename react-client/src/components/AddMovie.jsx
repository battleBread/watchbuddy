import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Form, Button, Checkbox, Dropdown, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import  _ from 'lodash';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.movieId,
      startDate: moment(),
      endDate: moment(),
      startDatejs: '',
      endDatejs: '',
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
      selectedHour: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      username: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ username: nextProps.username });
    this.setState({ movieId: nextProps.movieId });
  }

  handleSubmit() {
    //make ajax call to add with all info
    $.ajax({
      method: 'POST',
      url: '/addshow', //need to change endpoint
      contentType: 'application/json',
      data: JSON.stringify({
        username: this.state.username,
        movieId: this.state.movieId,
        movieName: this.props.movieName,
        startDate: this.state.startDatejs,
        endDate: this.state.endDatejs,
        monday: this.state.monday,
        tuesday: this.state.tuesday,
        wednesday: this.state.wednesday,
        thursday: this.state.thursday,
        friday: this.state.friday,
        saturday: this.state.saturday,
        sunday: this.state.sunday,
        hours: this.state.selectedHour
      }),
      success: data => {
        this.props.getPostAddShowData(data); //change function?
        this.props.changeView('DisplaySchedule');
      }
    });
  }

  handleDay(day) {
    let setObj = {};
    if (this.state[day] === 0) {
      setObj[day] = 1;
      this.setState(setObj);
    } else {
      setObj[day] = 0;
      this.setState(setObj);
    }
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
            Schedule a time:
          </Header>




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

export default AddMovie;