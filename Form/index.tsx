import * as React from 'react';
import Component from '../AbstractComponent';
import './index';

export interface Props {
  onSubmit?: Function,
  mode: 'vertical' | 'horizontal' | 'inline' | 'list'
}

export interface ItemProps {
  mode: 'vertical' | 'horizontal' | 'inline' | 'list',
  form: Form,
  children?: any
}

export default class Form extends Component<Props> {

  static defaultProps = {
    mode: 'vertical',
  };

  renderChildren(children) {
    const {mode} = this.props;
    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if ((child.type as any).name === 'Input') {
        return React.cloneElement<any, ItemProps>(child, {
          mode,
          form: this
        });
      }
      return React.cloneElement<any, any>(child, {
        children: this.renderChildren(child.props.children)
      });
    });
  }

  render() {
    const {children, mode} = this.props;
    const cls = {
      [`form-${mode}`]: true
    };
    return (
      <form className={this.getClassName('form', cls)}>
        {this.renderChildren(children)}
      </form>
    );
  }

}
