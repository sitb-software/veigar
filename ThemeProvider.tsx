import * as React from 'react';
import * as PropTypes from 'prop-types';
import {classPrefix} from './styles';

export default class ThemeProvider extends React.Component<any, any> {

  static childContextTypes = {
    classPrefix: PropTypes.string
  };

  getChildContext() {
    return {
      classPrefix
    };

  }

  render() {
    return this.props.children;
  }

}
