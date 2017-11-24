import * as React from 'react'
const classNames = require('classnames')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../../main/config'
import { navigate } from '../../main/router.actions'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/Link';
import Session from '../../components/Session/Session'
import txt from './literals';
import {Button} from 'react-toolbox/lib/button';
const css = require('./ir-styles.css')

function Pagination (props) {
  const { pageActive, callback, totalItems, type } = props
  const totalPages = Math.ceil(totalItems / config.limit)
  const pages = totalPages > config.paginationLimit ? config.paginationLimit : totalPages
  const menuItems = Array.from({length: pages}).map((o, i) => (++i).toString())
  if (totalPages < 1) return null
  function selectMenu (e) {
    e.preventDefault()
    const page = e.currentTarget.getAttribute('href')
    callback(page)
  }

  function download () {
    window.location.href = '/' + type + '/' + type + '-list.csv'
  }

  return (
    <div className={css.main}>
        {menuItems.map((item, i) => (
          <Link key={i} className={css.menu} active={pageActive == ++i} href={item} label={item} onClick={selectMenu} />
        ))}

        <span className={css.total}>{txt.totalPages + ' ' + totalPages}</span>
        <Button primary className={css.btn} mini raised onClick={download}>{txt.download}</Button>
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
