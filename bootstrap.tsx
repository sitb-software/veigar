import * as React from 'react';
import {render} from 'react-dom';
import ThemeProvider from './ThemeProvider';

export default (App, id = 'application'): any => new Promise((resolve) => {
  window.addEventListener('DOMContentLoaded', resolve);
}).then(() => render(
  <ThemeProvider><App/></ThemeProvider>,
  document.getElementById(id)
));
