/**
 * author: 阳尧（yyao@shangfudata.com）
 * Date：2017/9/22
 */
import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  mode?: 'primary' | 'default',
  ghost?: boolean
}

export default class Button extends Component<Props> {

  static defaultProps = {
    mode: 'default',
    ghost: false
  };

  render() {
    const {children, mode, ghost, ...other} = this.props;
    return (
      <button {...other}
              className={this.getClassName('button', mode, {ghost})}
      >
        {children}
      </button>
    );
  }

}
