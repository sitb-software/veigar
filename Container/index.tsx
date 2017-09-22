import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export const className = fluid => `container${fluid && '-fluid'}`;

export default class Container extends Component {

  render() {
    const {fluid, children, ...props} = this.props;
    return (
      <div {...props}
           className={this.getClassName(className(fluid))}
      >
        {children}
      </div>
    );
  }

}
