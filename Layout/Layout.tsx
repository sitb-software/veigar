import * as React from 'react';
import Component from '../AbstractComponent';

export default class Layout extends Component {

  render() {
    return (
      <div className={this.getClassName('main')}>
        {this.props.children}
      </div>
    );
  }

}
