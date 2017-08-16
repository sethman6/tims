import request from 'superagent'

export const GET_MESSAGES = 'GET_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_POSTS'
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SHOW_ERROR = 'SHOW_ERROR'

export function requestDeleteMessage (id) {
  return (dispatch) => {
    request
      .delete(`/api/v1/messages/${id}`)
      .end((err, res) => {
        if (err) {
          return (
          showError(err.message)
          )
        }
        dispatch(fetchMessages())
      })
  }
}

export function requestMessages () {
  return {
    type: REQUEST_MESSAGES
  }
}

export function receiveMessages (messages) {
  return {
    type: RECEIVE_MESSAGES,
    messages: messages
  }
}

export function addNewMessage (message) {
  return {
    type: ADD_MESSAGE,
    message: message
  }
}

export function showError (errorMessage) {
  return {
    type: SHOW_ERROR,
    errorMessage: errorMessage
  }
}

export function fetchMessages () {
  return (dispatch) => {
    dispatch(requestMessages())
    request
      .get('/api/v1/messages')
      .end((err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(receiveMessages(res.body))
        }
      })
  }
}

export function addMessage (message, cb) {
  return (dispatch) => {
    request
      .post('/api/v1/new')
      .send(message)
      .end((err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(fetchMessages())
          cb()
        }
      })
  }
}
