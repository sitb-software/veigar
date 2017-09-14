import * as React from 'react';
import Component from '../AbstractComponent';
import * as classNames from 'classnames';
import {classPrefix} from '../styles';
import './index.scss';

class Base extends Component {

  render() {
    const {type, cls, children, ...props} = this.props;
    return (
      <div {...props}
           className={this.getClassName(type, cls)}
      >
        {children}
      </div>
    );
  }

}

export const containerClass = `${classPrefix}container`;

export const containerClassFluid = `${containerClass}-fluid`;

export function Container({fluid = false, ...props}) {
  return (
    <Base {...props}
          type={`container${fluid ? '-fluid' : ''}`}
    />
  );
}

export const rowClass = `${classPrefix}row`;

export function Row(props) {
  return (
    <Base {...props}
          type="row"
    />
  );
}

export function colClass({xs = 0, md = 0, lg = 0, sm = 0}) {
  const cls = {};
  cls[`${classPrefix}col-xs-${xs}`] = xs;
  cls[`${classPrefix}col-sm-${sm}`] = sm;
  cls[`${classPrefix}col-md-${md}`] = md;
  cls[`${classPrefix}col-lg-${lg}`] = lg;
  return classNames(cls);
}

export function Col({xs = 0, md = 0, lg = 0, sm = 0, ...props}) {
  const cls = {};
  cls[`col-xs-${xs}`] = xs;
  cls[`col-sm-${sm}`] = sm;
  cls[`col-md-${md}`] = md;
  cls[`col-lg-${lg}`] = lg;
  return (
    <Base {...props}
          cls={cls}
    />
  );
}

