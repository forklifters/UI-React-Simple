import { Action as ReduxAction } from 'redux'
import {} from './actions'
import { isType } from 'redux-typescript-actions'
import { handleChangeAction,
  setUserAction, logoutAction, setLoginErrorAction,
  setMsgAction,
  removeMsgAction,
  setDisabledAction,
  setDataAction
} from './actions'

/**
 * @description INITIAL State
 */
const DEFAULT_STATE = {
  user: '',
  userError: '',
  pwd: '',
  pwdError: '',
  token: sessionStorage.getItem('token') || '',
  nodes: [],
  logs: [],
  pagination: {
    pageNodes: 0,
    pageLogs: 0,
    totalLogs: 6,
    totalNodes: 144
  }
}

function setUser (state, action) {
  const newState = {}
  const {token} = action.payload
  Object.assign(
    newState,
    state,
    action.payload
  )
  sessionStorage.setItem('token', token)
  return newState
}

function removeUser (state) {
  return Object.assign({}, state,
    {token: '', fullname: '', user: '', pwd: ''}
  )
}

function setMsg (state, {payload}) {
  const msg = payload
  return Object.assign({}, state, {
    msg
  })
}

function removeMsg (state, {payload}) {
  return Object.assign({}, state, {
    msg: null
  })
}

function setDisabled (state, {payload}) {
  return Object.assign({}, state, {
    disabled: payload
  })
}


function handleChange (state, {payload}) {
  const keys = payload.path.split('.')
  const name = keys.pop()
  const newState = Object.assign({}, state)
  let key = keys.reduce((i, e) => {
    return i[e]
  }, newState)
  key[name] = payload.value // New value set
  return newState
}

function setLoginError (state, {payload}) {
  const {field, error} = payload
  const newState = Object.assign({}, state)
  newState[field] = error
  return newState
}

function setData (state, {payload}) {
  const {name, data} = payload
  const newState = Object.assign({}, state)
  newState[name] = data
  return newState
}

export function data (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, handleChangeAction)) {
    return handleChange(state, action)
  }
  if (isType(action, setUserAction)) {
    return setUser(state, action)
  }
  if (isType(action, logoutAction)) {
    return removeUser(state)
  }
  if (isType(action, setLoginErrorAction)) {
    return setLoginError(state, action)
  }
  if (isType(action, setMsgAction)) {
    return setMsg(state, action)
  }
  if (isType(action, removeMsgAction)) {
    return removeMsg(state, action)
  }
  if (isType(action, setDisabledAction)) {
    return setDisabled(state, action)
  }
  if (isType(action, setDataAction)) {
    return setData(state, action)
  }
  return state
}
