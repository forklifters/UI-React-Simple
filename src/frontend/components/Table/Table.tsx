import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDataList } from '../../main/actions'
import Modal from '../../components/Modal/Modal'
import txt from './literals'
const css = require('./ir-styles.css')

class Table extends React.Component<any, any> {
  id: string
  path: string
  headers: any
  constructor (props) {
    super(props)
    this.state = {selectedDetails: null}
    this.id = props.id
    this.path = props.path
    this.headers = props.headers

  }
  componentDidMount (prevProps, prevState) {
    const {getDataListAction} = this.props.actions
    const {list, page} = this.props
    if (!list.length) getDataListAction({page, path: this.path})
  }

  getRows (list) {
    if (!list.length) return null
    return list.map((item, i) => {
      const row = this.getRow(item)
      return <tr key={i} onClick={this.openDetail.bind(this)} rel={item[this.id]}>{row}</tr>
    })
  }

  getHeaders (list) {
    if (!list.length) return null
    return Object.keys(list[0]).map((key, i) => {
      return <th key={i}>{this.headers[key]}</th>
    })
  }

  getRow (node) {
    return Object.keys(node).map((key, i) =>{
      return <td key={i}>{node[key]}</td>
    })
  }
  getDetail (node) {
    return Object.keys(node)
      .map((key, i)=> ({title: this.headers[key], desc: node[key]}))
  }
  closeDetail () {
    this.setState({selectedDetails: null})
  }
  openDetail (e) {
    const node = this.props.list.find((o) => e.currentTarget.getAttribute('rel') == o[this.id])
    this.setState({selectedDetails: this.getDetail(node)})
  }
  render () {
    const {list} = this.props
    if (!list) return null
    const rows = this.getRows(list)
    const headers = this.getHeaders(list)
    const selectedDetails = this.state.selectedDetails
    return (
      <div>
        <Modal show={selectedDetails}
               msg={{list: selectedDetails, title: this.props.detailTitle || txt.detailTitle}}
               callback={this.closeDetail.bind(this)} />
        <table className={css.table}>
          <thead>
          <tr>
            {headers}
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    getDataListAction: getDataList
  }, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)