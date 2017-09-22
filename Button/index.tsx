/**
 * author: 阳尧（yyao@shangfudata.com）
 * Date：2017/9/22
 */
import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  width: number,
  style?: any,
  butValue?: string
}

export interface SearchFunc {
  onclick: string
}

export default class Button extends Component<Props, SearchFunc> {

  render() {
    const {style, onclick, butValue} = this.props;
    return (
      <button className={this.getClassName('button')}
              onClick={onclick}
              style={{style}}
      >{butValue}</button>
    );
  }

}
