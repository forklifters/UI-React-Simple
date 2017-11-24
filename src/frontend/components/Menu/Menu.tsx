import * as React from 'react'
const classNames = require('classnames')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../../main/router.actions'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/Link';
import Session from '../../components/Session/Session'
import txt from './literals';
const css = require('./ir-styles.css')

export interface IMenuProps {
  actions:{
    navigate: (event) => void
  },
  showMenu: string,
  menuActive: string,
  fullname: string,
  menuItems: {
    name: string,
    url: string,
    icon: string,
  }[]
}

function Menu (props: IMenuProps) {
  const { navigate } = props.actions
  const { menuActive, menuItems, fullname } = props
  function selectMenu (e) {
    e.preventDefault()
    navigate(e)
  }
  return (
    <AppBar title={txt.title} leftIcon="">
      <Navigation type="horizontal">
        {menuItems.filter(o => o.url !== '/').map((item, i) => (
          <Link key={i} className={css.menu} active={menuActive === item.url} href={item.url} label={item.name} icon={item.icon} onClick={selectMenu} />
        ))}
        <Session name={fullname} />
      </Navigation>
    </AppBar>
  )
}

function mapStateToProps (state, props) {
  return {
    menuActive: state.router.menuActive,
    menuItems: state.router.menuItems,
    fullname: state.data.fullname,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    navigate
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
