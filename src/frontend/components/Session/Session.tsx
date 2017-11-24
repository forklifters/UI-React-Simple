import * as React from 'react';
const css = require('./ir-styles.css')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import {IconButton} from 'react-toolbox/lib/button';
import { logout } from '../../main/actions'

function Session (props) {
  const {name} = props
  const {logoutAction} = props.actions
  if (!name) {
    return null
  }
  return (
    <div className={css.main}>
      <Chip className={css.chip}>
        <Avatar className={css.avatar} title={name} />
        <strong className={css.name}>{name}</strong>
      </Chip>
      <IconButton icon="exit_to_app" className={css.exit} onClick={() => logoutAction()} />
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    token: state.data.token
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    logoutAction: logout
  }, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Session)