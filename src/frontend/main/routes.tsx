import * as React from 'react'
import { renderPage, providePage } from './dom.utils'
import { store } from './store'

// Pages Components
import Login from '../containers/Login/Login'
import Nodes from '../containers/Nodes/Nodes'
import Logs from '../containers/Logs/Logs'

export default {
  '/login': Login,
  '/nodes': Nodes,
  '/logs': Logs
}

if (module.hot) {
  module.hot.accept('../containers/Login/Login.tsx', () => {
    const Page = require('../containers/Login/Login.tsx').default
    renderPage(providePage(<Page />, store))
  })

}