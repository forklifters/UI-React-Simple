import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleChange, login } from '../../main/actions'
const css = require('./ir-styles.css')

import {Button} from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';

import txt from './literals'
import Msg from '../../components/Msg/Msg'
import Menu from '../../components/Menu/Menu'

function Login (props) {
  const {msg, user, userError, pwd, pwdError, disabled, fullname} = props
  const {handleChangeAction, loginAction} = props.actions

  return (
    <div>
      <Menu />
      <div>
          <div className={css.row}>
            <div className={css.minHeight}>
              {msg && msg.type &&
                <Msg type={msg.type} msg={msg.text} />
              }
            </div>
          </div>
        <div className={css.row}>
          <div className={css.main}>
            <h1>{txt.title}</h1>
            <FontIcon value="lock" className={css.icon}/>
            <h2>{txt.subTitle}</h2>
            <div className={css.fields}>
              <Input type="text" label={txt.user.label} required hint={txt.user.hint} value={user} error={userError} onChange={handleChangeAction('user')} />
              <Input type="password" label={txt.pass.label} required hint={txt.pass.hint} value={pwd} error={pwdError} onChange={handleChangeAction('pwd')} />
              <Button raised primary className={css.btn} disabled={disabled} onClick={()=>loginAction({user, pwd})}>{txt.start}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    disabled: state.data.disabled,
    msg: state.data.msg,
    user: state.data.user,
    fullname: state.data.fullname,
    pwd: state.data.pwd,
    userError: state.data.userError,
    pwdError: state.data.pwdError
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    handleChangeAction: handleChange,
    loginAction: login
  }, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)