import * as React from 'react';

import { FormContext } from './index';

export interface FieldProps {
  /**
   * 是否校验input
   */
  validate?: boolean

  miss?: boolean
  /**
   * 当input没有填写值时提示的错误信息
   */
  missText?: string

  mismatch?: boolean
  /**
   * 与正则表达式不匹配错误消息
   */
  mismatchText?: string

  error?: boolean
  errorText?: string

  /**
   * 表明字段是必须填写的
   */
  required?: boolean

  /**
   * 正则表达式用于判断输入的值是否符合预期
   */
  pattern?: RegExp
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/2
 */
export const field = (ComposedComponent): any => class FieldWrapper extends React.Component<any, any> {

  static defaultProps = {
    validate: true
  };

  state = {
    value: '',
    miss: false,
    mismatch: false,
    error: false
  };

  form;

  componentDidMount(): void {
    const {name} = this.props;
    if (name && this.form && this.form.putFormField) {
      this.form.putFormField(name, this);
    }
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({value}, this.valid);
  }

  /**
   * 处理onChange事件
   * @param event
   */
  handleChange = (event) => {
    const {onChange} = this.props;
    const value = event.target.value;
    this.setState({value}, this.valid);
    onChange && onChange(event);
  };

  valid = (): boolean => {
    const {
      validate,
      required, missText,
      pattern, mismatchText,
      name
    } = this.props;
    if (!validate) {
      return true;
    }

    const {value} = this.state;
    if (name && required && !value) {
      console.warn(`${name} is required`);
      this.form && this.form.putMissField && this.form.putMissField(name, missText);
      this.setState({miss: true});
      return false;
    }

    if (pattern && !pattern.test(value)) {
      console.warn(`${name} mismatch ${pattern}`);
      this.form && this.form.putMissField && this.form.putMismatchField(name, mismatchText);
      this.setState({mismatch: true});
      return false;
    }

    this.setState({miss: false, mismatch: false, error: false});
    return true;
  };

  render() {
    const {validate, ...props} = this.props;
    return (
      <FormContext.Consumer>
        {form => {
          this.form = form;
          return (
            <ComposedComponent {...props}
                               {...this.state}
                               form={form}
                               onChange={this.handleChange}
            />
          );
        }}
      </FormContext.Consumer>
    );
  }
};

export default field;


