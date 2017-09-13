import * as React from 'react';
import Component from '../AbstractComponent';
import './Header.scss';

export class Header extends Component {

  render() {
    return (
      <header className={this.getClassName('header')}>
        {this.props.children}
      </header>
    );
  }

}
