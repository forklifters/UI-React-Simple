import * as React from 'react';
const css = require('./ir-styles.css')
import FontIcon from 'react-toolbox/lib/font_icon';
import ProgressBar from 'react-toolbox/lib/progress_bar';

export default function Msg (props) {
  const {msg, type} = props
  // Icon types:
  //   error, warning, info, success
  let iconName = type
  if (type === 'success') iconName = 'check_circle'
  const icon = type === 'loading'
    ? <ProgressBar type="circular" mode="indeterminate" className={css.icon} />
    : <FontIcon type={type} value={iconName} className={css.icon} />

  return (
    <div className={css.main} type={type}>
      {icon}
      <p className={css.text}>{msg}</p>
    </div>
  )
}