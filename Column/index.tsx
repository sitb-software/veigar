import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  width: number,
  style?: any
}

export default class Column extends Component<Props> {

  render() {
    const {style, width, children} = this.props;
    return (
      <div className={this.getClassName('column')}
           style={[{width: `${width}%`}, style]}
      >
        {children}
      </div>
    );
  }

}
