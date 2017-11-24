import * as React from 'react';
import { connect } from 'react-redux'
import Msg from '../../components/Msg/Msg'
import Menu from '../../components/Menu/Menu'
import { getDataList } from '../../main/actions'
import { bindActionCreators } from 'redux'
const css = require('./ir-styles.css')
import txt from './literals'
import Table from '../../components/Table/Table'
import Pagination from '../../components/Pagination/Pagination'

class Logs extends React.Component<any, any> {
  path: string
  page: number
  id: string
  constructor (props) {
    super(props)
    this.path = 'logs'
    this.page = 1
    this.id = 'DateUtc'
  }

  componentDidMount (prevProps, prevState) {
    const {getDataListAction} = this.props.actions
    const {list} = this.props
    if (!list.length) getDataListAction({page: this.page, path: this.path})
  }

  getPage (page) {
    const {getDataListAction} = this.props.actions
    getDataListAction({page, path: this.path})
    this.page = page
  }

  render () {
    const {msg, list, token, totalItems} = this.props
    if (!token) return null
    return (
      <div>
        <Menu />
        <div>
          <div className={css.row}>
            <div className={css.minHeight}>
              {msg && msg.type &&
              <Msg type={msg.type} msg={msg.text}/>
              }
            </div>
          </div>
          <div className={css.row}>
            <div className={css.main}>
              <h1>{txt.title}</h1>
              <Table headers={txt.headers} path={this.path} id={this.id} list={list} detailTitle={txt.detailTitle} />
              <Pagination pageActive={this.page} totalItems={totalItems} callback={this.getPage.bind(this)} type="logs" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    msg: state.data.msg,
    list: state.data.logs,
    totalItems: state.data.pagination.totalLogs,
    disabled: state.data.disabled,
    token: state.data.token
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    getDataListAction: getDataList
  }, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
