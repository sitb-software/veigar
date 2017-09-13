import * as React from 'react';
import Component from '../AbstractComponent';

export class Footer extends Component {

  render() {
    return (
      <footer className={this.getClassName('footer')}>
        {this.props.children}
      </footer>
    );
  }

}
