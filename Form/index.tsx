import * as React from 'react';
import * as PropTypes from 'prop-types';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  /**
   * 表单名字
   */
  name?: string,
  onSubmit?: Function,
  mode: 'vertical' | 'horizontal' | 'list',
  labelWidth?: number,
  wrapperWidth?: number
}

export interface ItemProps {
  name?: string,
  mode?: 'vertical' | 'horizontal' | 'list',
  labelWidth?: number,
  wrapperWidth?: number,
  form?: Form,
  children?: any
}

/**
 * 创建表单
 */
export function create() {

  return AppComponent => class FormWrapper extends Component {

    static childContextTypes = {
      registerForm: PropTypes.func
    };

    state = {
      forms: {}
    };

    getChildContext() {
      return {
        registerForm: (name, form) => {
          const {forms} = this.state;
          forms[name] = form;
          this.setState(forms);
        }
      };

    }

    render() {
      return (
        <AppComponent forms={this.state.forms}/>
      )
    }

  };
}

export default class Form extends Component<Props> {

  static defaultProps = {
    name: 'form',
    mode: 'horizontal'
  };

  static contextTypes = {
    registerForm: PropTypes.func
  };

  fields = {};

  errorFields;

  componentDidMount() {
    const {name} = this.props;
    const {registerForm} = this.context;
    name && registerForm && registerForm(name, this);
  }

  handleSubmit() {
    const {onSubmit} = this.props;
    this.validateFields();
    onSubmit && onSubmit();
  }

  validateFields() {
    this.errorFields = {
      miss: {},
      mismatch: {}
    };
    Object.keys(this.fields).forEach(key => this.fields[key].valid());
    return this.errorFields;
  }

  getValue() {
    const value = {};
    Object.keys(this.fields).forEach(key => {
      const {name} = this.fields[key].props;
      if (name) {
        value[name] = this.fields[key].getValue();
      }
    });
    return value;
  }

  putMissField(name, message) {
    this.errorFields.miss[name] = message;
  }

  putMismatchField(name, message) {
    this.errorFields.mismatch[name] = message;
  }

  renderChildren(children) {
    const {mode, labelWidth, wrapperWidth} = this.props;
    let lw = labelWidth;
    let ww = wrapperWidth;
    if (labelWidth && !wrapperWidth) {
      ww = 100 - labelWidth;
    } else if (!labelWidth && wrapperWidth) {
      lw = 100 - wrapperWidth;
    }
    // 清空表单
    this.fields = {};

    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const {name} = child.props;

      if ((child.type as any).name === 'Input') {
        const input = React.cloneElement<any, ItemProps>(child, {
          mode,
          form: this,
          labelWidth: child.props.labelWidth || lw || 20,
          wrapperWidth: child.props.wrapperWidth || ww || 80
        });
        if (name) {
          this.fields[name] = input;
        }

        return input;
      }
      return React.cloneElement<any, any>(child, {
        children: this.renderChildren(child.props.children)
      });
    });
  }

  render() {
    const {children, mode} = this.props;
    return (
      <form className={this.getClassName('form', mode)}
            onSubmit={this.handleSubmit}
      >
        {this.renderChildren(children)}
      </form>
    );
  }

}
