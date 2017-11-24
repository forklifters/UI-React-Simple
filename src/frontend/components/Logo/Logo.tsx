import * as React from 'react';
const css = require('./ir-styles.css')

export default function Logo (props) {
  return (
    <div className={css.logo}>
      <div>
        <h1 className={css.title}>iRespond UNiD</h1>
      </div>
    </div>
  )
}
