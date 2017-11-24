import * as React from 'react';
import 'core-js/modules/es6.object.assign'

require('file-loader?name=./index.html!../www/index.html');
require('file-loader?name=./global.css!../www/global.css');
require('../www/global.css')

import { store } from './main/store'
import { navigate } from './main/router.actions'

store.dispatch(navigate({url: location.pathname}))

if (window.addEventListener) {
  window.addEventListener('popstate', () => {
    store.dispatch(navigate({url: location.pathname}))
  })
}