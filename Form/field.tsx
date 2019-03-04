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
    fieldValue: '',
    miss: false,
    mismatch: false
  };

  form;
  /**
   * 表单传递过来的初始化值
   */
  initialValue;
  field;

  componentDidMount(): void {
    const {name} = this.props;
    if (name && this.form && this.form.putFormField) {
      this.form.putFormField(name, this);
    }
    if (name && this.initialValue && this.initialValue[name]) {
      this.setState({fieldValue: this.initialValue[name]});
    }
  }

  getValue() {
    if (this.field && this.field.getValue) {
      return this.field.getValue();
    }
    return this.state.fieldValue;
  }

  setValue(fieldValue) {
    if (this.field && this.field.setValue) {
      this.field.setValue(fieldValue);
    }
    this.setState({fieldValue}, this.valid);
  }

  resetValue() {
    if (this.field && this.field.resetValue) {
      this.field.resetValue();
    }
    this.setState({fieldValue: ''});
  }
  /**
   * 处理onChange事件
   * @param event
   */
  handleChange = (event) => {
    const {onChange} = this.props;
    const fieldValue = event.target.value;
    this.setState({fieldValue}, this.valid);
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

    const {fieldValue} = this.state;
    if (name && required && !fieldValue) {
      console.warn(`${name} is required`);
      this.form && this.form.putMissField && this.form.putMissField(name, missText);
      this.setState({miss: true});
      return false;
    }

    if (pattern && !pattern.test(fieldValue)) {
      console.warn(`${name} mismatch ${pattern}`);
      this.form && this.form.putMissField && this.form.putMismatchField(name, mismatchText);
      this.setState({mismatch: true});
      return false;
    }

    this.setState({miss: false, mismatch: false});
    return true;
  };

  render() {
    const {validate, defaultValue, ...props} = this.props;
    const {fieldValue} = this.state;
    return (
      <FormContext.Consumer>
        {({initialValue = {}, form}: any = {}) => {
          this.form = form;
          this.initialValue = initialValue;
          let newDefaultValue = defaultValue;
          if (!newDefaultValue && props.name && initialValue) {
            newDefaultValue = initialValue[props.name];
          }
          return (
            <ComposedComponent {...props}
                               {...this.state}
                               defaultValue={newDefaultValue}
                               form={form}
                               value={fieldValue}
                               onChange={this.handleChange}
                               ref={field => this.field = field}
            />
          );
        }}
      </FormContext.Consumer>
    );
  }
};

export default field;


