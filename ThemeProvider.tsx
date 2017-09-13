import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class ThemeProvider extends React.Component<any, any> {

  static childContextTypes = {
    classPrefix: PropTypes.string
  };

  getChildContext() {
    return {
      classPrefix: 'sitb-rn-'
    };

  }

  render() {
    return this.props.children;
  }

}
