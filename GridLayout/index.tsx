import * as React from 'react';
import Component from '../AbstractComponent';
import 'index.scss';

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

export function Container({fluid, ...props}) {
  return (
    <Base {...props}
          type={`container${fluid ? '-fluid' : ''}`}
    />
  );
}

export function Row(props) {
  return (
    <Base {...props}
          type="row"
    />
  );
}

export function Col({xs, md, lg, sm, ...props}) {
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

