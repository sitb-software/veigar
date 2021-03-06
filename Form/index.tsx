import * as React from 'react';
import * as objectPath from 'object-path';
import Component from '../AbstractComponent';
import './index.scss';

export interface Props {
  /**
   * 表单名字
   */
  name?: string,
  onSubmit?: () => void,
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

export const FormContext = React.createContext({});

export default class Form extends Component<Props> {

  static defaultProps = {
    noValidate: false
  };

  fields = {};

  errorFields: any = {};

  handleSubmit() {
    const {onSubmit} = this.props;
    this.validate();
    onSubmit && onSubmit(this);
  }

  validate() {
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
        objectPath.set(value, name, this.fields[key].getValue());
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

  resetValue() {
    Object.keys(this.fields).forEach(key => {
      this.fields[key].resetValue();
    });
  }

  putMissField(name, message) {
    if (!this.errorFields)
      this.errorFields = {};
    if (!this.errorFields.miss) {
      this.errorFields.miss = {};
    }
    this.errorFields.miss[name] = message;
  }

  putMismatchField(name, message) {
    if (!this.errorFields) {
      this.errorFields = {};
    }
    if (!this.errorFields.mismatch) {
      this.errorFields.mismatch = {};
    }
    this.errorFields.mismatch[name] = message;
  }

  putFormField(name, field) {
    this.fields[name] = field;
  }

  render() {
    const {children, initialValue, ...props} = this.props;
    return (
      <FormContext.Provider value={{initialValue, form: this}}>
        <form {...props}
              className={this.getClassName('form')}
              onSubmit={this.handleSubmit}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }

}
