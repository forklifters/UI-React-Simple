import actionCreatorFactory from 'redux-typescript-actions'
const actionCreator = actionCreatorFactory()
import axios from 'axios'
import {navigate} from './router.actions'
import txt from './literals'
import config from './config'

export const logoutAction = actionCreator('LOGOUT_USER')
export const setUserAction = actionCreator<{}>('SET_USER')
export const setLoginErrorAction = actionCreator<{}>('SET_ERROR')
export const removeMsgAction = actionCreator('UNSET_MSG')
export const setMsgAction = actionCreator<{type: string, text: string}>('SET_MSG')
export const setDisabledAction = actionCreator<boolean>('SET_LOADING')
export const setDataAction = actionCreator<{name: string, data: any}>('SET_DATA')

export const handleChangeAction = actionCreator<{path: string, value: string}>('STATE_CHANGE')

export function logout () {
  return (dispatch, store) => {
    dispatch(logoutAction())
    dispatch(navigate({url: '/login'}))
  }
}

export function login ({user, pwd}) {
  return (dispatch, store) => {
    const required = txt.error.fieldRequired
    if (!user) {
      return dispatch(setLoginErrorAction({field: 'userError', error: required}))
    }
    dispatch(setLoginErrorAction({field: 'userError', error: ''}))
    if (!pwd) {
      return dispatch(setLoginErrorAction({field: 'pwdError', error: required}))
    }
    dispatch(setLoginErrorAction({field: 'pwdError', error: ''}))
    postLoginData(dispatch, {user, pwd, path: 'nodes', token: null})
  }
}

function isLogged (dispatch, store, path) {
  const {token, fullname} = store.getState().data
  if (token) postLoginData(dispatch, {user: null, pwd: null, token, path})
  return !!fullname
}

function checkAuth (dispatch, store, path) {
  if (!isLogged(dispatch, store, path)) {
    dispatch(setMsgAction({type: 'loading', text: txt.error.loading}))
    dispatch(setDisabledAction(true))
    return dispatch(navigate({url: '/login'}))
  }
}

export function getDataList ({page, path}) {
  return (dispatch, store) => {
    if (checkAuth(dispatch, store, path)) {
      return
    }
    requestData(dispatch, path, page)
  }
}

function requestData (dispatch, path, page) {
  dispatch(setMsgAction({type: 'loading', text: txt.error.loading}))
  axios.get(config.api + '/' + path, {params: {_page: page, _limit: config.limit}})
    .then(({data}) => {
      dispatch(removeMsgAction())
      dispatch(setDataAction({name: path, data}))
    })
    .catch((error) => {
      console.log(error)
      dispatch(removeMsgAction())
    })
}

function postLoginData (dispatch, {user, pwd, token, path}) {
  dispatch(setDisabledAction(true))
  axios.get(config.api + '/login', {params: {user, pwd, token}})
    .then(({data}) => {
      dispatch(setDisabledAction(false))
      dispatch(setUserAction(data))
      dispatch(navigate({url: '/' + path}))
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.response.status
      if (errorCode === 401) {
        dispatch(setMsgAction({type: 'warning', text: txt.error.userInvalid}))
      } else if (errorCode === 403) {
        dispatch(navigate({url: '/login'}))
      } else {
        dispatch(setMsgAction({type: 'error', text: error.message}))
      }
      dispatch(setDisabledAction(false))
    })
}

export function handleChange (path) {
  return (dispatch) => {
    return (value) => {
      dispatch(handleChangeAction({path, value}))
    }
  }
}