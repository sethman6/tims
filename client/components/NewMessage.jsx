import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {getPeople, addMessage} from '../actions'

const styles = {
  borderRadius: '50%',
  background: 'white',
  width: '300px',
  height: '300px'
}

class NewMessage extends React.Component {
  constructor () {
    super()
    this.state = {
      sender: null,
      senderId: null,
      recipient: null,
      recipientId: null,
      senderPhoto: null,
      recipientPhoto: null,
      message: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleGetPhoto = this.handleGetPhoto.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)
  }

  componentDidMount () {
    this.props.getPeople()
  }

  handleGetPhoto (action, id) {
    const person = this.props.people.find((p) => p.id === Number(id))

    if (action === 'sender') {
      this.setState({senderPhoto: person.photo, sender: person.name, senderId: person.id})
    } else if (action === 'recipient') {
      this.setState({recipientPhoto: person.photo, sender: person.name, recipientId: person.id})
    }
  }

  handleChange (e) {
    const {name: action, value: id} = e.target

    this.setState({
      [action]: id
    })
    this.handleGetPhoto(action, id)
  }

  handleAddMessage (e) {
    const message = {
      senderId: this.state.senderId,
      recipientId: this.state.recipientId,
      message: this.state.message
    }
    this.props.addMessage(message, () => {
      this.props.history.push('/')
    })
  }

  render () {
    return (
      <div>
        <div className='title'><h1>Welcome To TIMS New Message Form</h1>
        <h2>Add a new message with the form below</h2>
        <p>Identify yourself as the sender, select a recipient to send a message too, upload an image and then click submit :)</p>
        </div>
        <div>
          <select name="sender" onChange={this.handleChange}>
            <option value="sender">Sender</option>
              {this.props.people.map((person) => {
                return <option key={person.id} value={person.id}>{person.name}</option>
              })}
          </select>
          <select name="recipient" onChange={this.handleChange}>
            <option value="recipient">Recipient</option>
              {this.props.people.map((person) => {
                return <option key={person.id} value={person.id}>{person.name}</option>
              })}
          </select>
        </div>
        <label>
          Image URL:
          <input type="text" name="message" onChange={this.handleChange}/>
        </label>
        <div>
          <img style={styles} src={this.state.senderPhoto}/>
          <img style={styles} src={this.state.message}/>
          <img style={styles} src={this.state.recipientPhoto}/>
        </div>
        <button value="submit" onClick={this.handleAddMessage}>Add Message</button>
        <Link to='/'>
          <button>Back to MessageWall</button>
        </Link>
      </div>
    )
  }
}

NewMessage.propTypes = {
  getPeople: React.PropTypes.func,
  people: React.PropTypes.array
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPeople: () => dispatch(getPeople()),
    addMessage: (message, cb) => {
      dispatch(addMessage(message, cb))
    }

  }
}

function mapStateToProps (state) {
  return {
    people: state.people
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
