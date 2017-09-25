/**
 * author: 阳尧（yyao@shangfudata.com）
 * Date：2017/9/22
 */
import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  mode?: 'primary' | 'default'
}

export default class Button extends Component<Props> {

  static defaultProps = {
    mode: 'default'
  };

  render() {
    const {children, mode, ...other} = this.props;
    return (
      <button {...other}
              className={this.getClassName('button', mode)}
      >
        {children}
      </button>
    );
  }

}
