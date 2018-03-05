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
export const create = (): Function => ComposedComponent => class FormWrapper extends Component {

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
      <ComposedComponent {...this.props}
                         forms={this.state.forms}/>
    )
  }
};

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
    if (Object.keys(this.errorFields.miss).length > 0 || Object.keys(this.errorFields.mismatch).length > 0) {
      return this.errorFields;
    }
    return null;
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

  setValue(values) {
    Object.keys(this.fields).forEach(key => {
      const {name} = this.fields[key].props;
      if (values[name]) {
        values[name] = this.fields[key].setValue(values[name]);
      }
    })
  }

  putMissField(name, message) {
    this.errorFields.miss[name] = message;
  }

  putMismatchField(name, message) {
    this.errorFields.mismatch[name] = message;
  }

  putFormField(name, field) {
    this.fields[name] = field;
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

    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if ((child.type as any).isFormItem) {
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
      <form className={this.getClassName('form', mode)}
            onSubmit={this.handleSubmit}
      >
        {this.renderChildren(children)}
      </form>
    );
  }

}
