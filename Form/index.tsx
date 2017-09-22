import * as React from 'react';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  onSubmit?: Function,
  mode: 'vertical' | 'horizontal' | 'list',
  labelWidth?: number,
  wrapperWidth?: number
}

export interface ItemProps {
  mode: 'vertical' | 'horizontal' | 'list',
  labelWidth?: number,
  wrapperWidth?: number,
  form: Form,
  children?: any
}

export default class Form extends Component<Props> {

  static defaultProps = {
    mode: 'horizontal'
  };

  renderChildren(children) {
    const {mode, labelWidth, wrapperWidth} = this.props;
    let lw = labelWidth;
    let ww = wrapperWidth;
    if (labelWidth && !wrapperWidth) {
      ww = 100 - labelWidth;
    } else if (!labelWidth && wrapperWidth) {
      lw = 100 - wrapperWidth;
    }

    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if ((child.type as any).name === 'Input') {
        return React.cloneElement<any, ItemProps>(child, {
          mode,
          form: this,
          labelWidth: child.props.labelWidth || lw || 20,
          wrapperWidth: child.props.wrapperWidth || ww || 80
        });
      }
      return React.cloneElement<any, any>(child, {
        children: this.renderChildren(child.props.children)
      });
    });
  }

  render() {
    const {children, mode} = this.props;
    return (
      <form className={this.getClassName('form', mode)}>
        {this.renderChildren(children)}
      </form>
    );
  }

}
