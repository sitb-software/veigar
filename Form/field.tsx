import * as React from 'react';

import { FormContext } from './index';

export interface FieldProps {
  /**
   * 是否校验input
   */
  validate?: boolean
  /**
   * 当input没有填写值时提示的错误信息
   */
  missText?: string

  /**
   * 与正则表达式不匹配错误消息
   */
  mismatchText?: string

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

  form;

  /**
   * 处理onChange事件
   * @param event
   */
  handleChange(event) {
    const {onChange, validate} = this.props;
    const value = event.target.value;
    this.setState({value});
    onChange && onChange(event);
    // 等于undefined 表明没有传值,则为true 开始校验Input
    (validate === undefined || validate) && this.valid();
  }

  valid(): boolean {
    const {
      required, missText,
      pattern, mismatchText,
      name
    } = this.props;

    const {value} = this.state;
    if (name && required && !value) {
      console.warn(`${name} is required`);
      this.form && this.form.putMissField(name, missText);
      this.setState({miss: true});
      return false;
    }

    if (pattern && !pattern.test(value)) {
      console.warn(`${name} mismatch ${pattern}`);
      this.form && this.form.putMismatchField(name, mismatchText);
      this.setState({mismatch: true});
      return false;
    }

    this.setState({miss: false, mismatch: false, error: false});
    return true;
  }

  render() {
    const {...props} = this.props;
    return (
      <FormContext.Consumer>
        {form => {
          this.form = form;
          return (
            <ComposedComponent {...props}
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


