import * as React from 'react';
import Component from '../AbstractComponent';

export class Content extends Component {

  render() {
    return (
      <div className={this.getClassName('content')}>
        {this.props.children}
      </div>
    );
  }

}
