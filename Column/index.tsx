import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  /**
   * 0 - 100 百分比宽度值
   */
  width?: number,
  style?: any
}

export default class Column extends Component<Props> {

  static defaultProps = {
    width: 100
  };

  render() {
    const {style, width, children} = this.props;
    return (
      <div className={this.getClassName('column')}
           style={{
             ...style,
             maxWidth: `${width}%`
           }}
      >
        {children}
      </div>
    );
  }

}
