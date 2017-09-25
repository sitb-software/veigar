/**
 * author: 阳尧（yyao@shangfudata.com）
 * Date：2017/9/22
 */
import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  children?: any,
  mode: 'vertical' | 'horizontal',
}

export default class Button extends Component<Props> {
  static defaultProps = {
    mode: 'horizontal'
  };
  render() {
    const {children, mode, ...other} = this.props;
    return (
      <div className={this.getClassName('buttonBox', mode)}>
        <button {...other}
                className={this.getClassName('button')}
        >{children}</button>
      </div>
    );
  }

}
