import * as React from 'react';
import Component from '../AbstractComponent';

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
    mode: 'horizontal',
  };

  renderChildren(children) {
    const {mode} = this.props;
    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.type === 'Input') {
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
    const {children} = this.props;
    return (
      <form className={this.getClassName('form')}>
        {this.renderChildren(children)}
      </form>
    );
  }

}
