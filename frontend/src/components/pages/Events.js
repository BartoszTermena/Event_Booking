import React, { Component } from 'react'
import {ButtonContainer} from '../layout/Button';
import Modal from '../layout/modal/Modal'
import Spinner from '../layout/spinner/Spinner'
import Backdrop from '../layout/modal/Backdrop'
import AuthContext from '../../context/auth-context'
import Event from '../layout/Event'

class Events extends Component {
  state = {
    events: [],
    creating: false,
    selectedEvent: null,
    title: '',
    description: '',
    price: '',
    date: ''
  }
  isActive = true;

  static contextType = AuthContext;
  
  componentDidMount() {
    this.fetchEvents()
  }

  fetchEvents() {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              email
              _id
            }
          }
        }
      `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        console.log(res)
      }
      return res.json()
    })
    .then(resData => {
      if(this.isActive) {
        this.setState({
          events: resData.data.events
        })
      }
    })
    .catch(err => {
      console.log(err)
    });

    this.setState({
      creating: false,
      title: '',
      date: '',
      price: '',
      description: ''
    });
  }

  createEventHandler = () => {
    this.setState({
      creating: true
    })
  }

  onCancel = () => {
    this.setState({
      creating: false,
      selectedEvent: null
    })
  }

  onConfirm = () => {
    const { title, description, price, date } = this.state;
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 
      ) {
        return ;
      }
      
    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {
            title: "${title}",
            description: "${description}",
            price: ${price},
            date: "${date}"
          }) {
            _id
            title
            description
            price
            date
            creator {
              email
              _id
            }
          }
        }
      `
    };
    console.log(price, description, date, title)
    const token = this.context.token;

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        console.log(res)
      }
      return res.json()
    })
    .then(resData => {
      this.fetchEvents();
    })
    .catch(err => {
      console.log(err)
    });

    this.setState({
      creating: false,
      title: '',
      date: '',
      price: '',
      description: ''
    });
  }
  handleNewEvents = (e) => {
    this.setState({
      [e.target.name]:  e.target.type === 'number' ? parseFloat(e.target.value).toFixed(2) : e.target.value
    })
  }
  
  onViewDetail = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent};
    });
  }

  bookEventHandler = () => {
    if(!this.context.token) {
      this.setState({selectedEvent: null})
      return;
    }
    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${this.state.selectedEvent._id}") {
            _id
            createdAt
            updatedAt
          }
        }
      `
    };

    const token = this.context.token;

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        console.log(res)
      }
      return res.json()
    })
    .then(resData => {
      console.log(resData)
    })
    .catch(err => {
      console.log(err)
    });
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    const eventList = this.state.events.length > 0 ? this.state.events.map(event => ((
      <Event key={event._id} 
      event={event} 
      authUserId={this.context.userId}
      onDetail={this.onViewDetail}
      />
    ))) : 
    <div><Spinner /></div>
    ;
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedEvent )&& <Backdrop />}
        {this.state.creating && (
        <Modal 
        confirmText="Confirm"
        title="Add Event" 
        onConfirm={this.onConfirm} 
        onCancel={this.onCancel} 
        canCancel 
        canConfirm>
          <form className="container-fluid py-5">
          <div className="form-group input-group">
              <input name="title" onChange={this.handleNewEvents} className="form-control" placeholder="Title" type="text"/>
          </div> 
          <div className="form-group input-group">
              <input name="price" onChange={this.handleNewEvents} className="form-control" placeholder="Price" type="number"/>
          </div>
          <div className="form-group input-group">
              <input name="date" onChange={this.handleNewEvents} className="form-control" placeholder="Date" type="datetime-local"/>
          </div> 
          <div className="form-group input-group">
              <textarea name="description" onChange={this.handleNewEvents} className="form-control" placeholder="Description" type="text"></textarea>
          </div>                                                  
      </form>
        </Modal>)}
        {this.state.selectedEvent && (
          <Modal 
          confirmText={this.context.token ? 'Book' : 'Confirm'}
          title={this.state.selectedEvent.title} 
          onConfirm={this.bookEventHandler} 
          onCancel={this.onCancel} 
          canCancel 
          canConfirm>
            <h3 className="text-left">${this.state.selectedEvent.price} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h3>
            <p className="text-left">{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        {this.context.token && (<div className="">
        <p>Share  your own Events!</p>
          <ButtonContainer onClick={this.createEventHandler}>Create Event</ButtonContainer>
        </div>)}
        <div className="container py-5">
            {eventList}
        </div>
      </React.Fragment>
    )
  }
}
export default Events