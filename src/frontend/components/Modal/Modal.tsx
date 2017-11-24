import * as React from 'react';
const css = require('./ir-styles.css')
import { List, ListItem } from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import {Button} from 'react-toolbox/lib/button';
import txt from './literals'
export default function Msg (props) {
  const {msg, show, callback} = props
  if (!show) return null
  return (
    <Dialog active={true} title={msg.title} type="large" className={css.main}>
      <List ripple={false} theme={css}>
        {msg.list.map((item, i) => (
          <ListItem key={i}
                    caption={item.title}
                    legend={item.desc}

          />
        ))}
      </List>
      <Button raised primary className={css.btn} onClick={callback}>{txt.close}</Button>

    </Dialog>
  )
}
