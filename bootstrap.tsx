import * as React from 'react';
import {render} from 'react-dom';

export default (App, id = 'application'): any => new Promise((resolve) => {
  window.addEventListener('DOMContentLoaded', resolve);
}).then(() => render(
  <App/>,
  document.getElementById(id)
));
