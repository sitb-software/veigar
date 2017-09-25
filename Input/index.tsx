import * as React from 'react';
import AbstractFormItem from '../Form/AbstractFormItem';
import Grid from '../Grid';
import Column from '../Column';
import {ItemProps} from '../Form/index';
import './index.scss';

export interface Props extends ItemProps {
  label?: React.ReactNode;
  colon?: boolean,
  /**
   * 表明字段是必须填写的
   */
  required?: boolean,
  /**
   * 当input没有填写值时提示的错误信息
   */
  missMsg?: string,
  /**
   * 正则表达式用于判断输入的值是否符合预期
   */
  pattern?: RegExp,
  /**
   * 与正则表达式不匹配错误消息
   */
  mismatchMsg?: string,
  onChange?: Function,
  onTextChange?: Function,
  onBlur?: Function
}

/**
 * 根据指定的props数组创建一组input输入框
 * @param {Array<Props>} inputProps
 * @returns {any[]}
 */
export function create<P extends Props>(inputProps: Array<P>) {
  return inputProps.map((props, index) => (
    <Input {...props}
           key={index}
    />
  ));
}

export default class Input extends AbstractFormItem<Props, any> {

  static defaultProps = {
    mode: 'horizontal',
    colon: true
  };

  state = {
    value: ''
  };

  getValue(): any {
    return this.state.value;
  }

  valid(): boolean {
    const {
      required, missMsg,
      pattern, mismatchMsg,
      name, form,
    } = this.props;
    const {value} = this.state;
    if (required && value === '') {
      console.warn(`${name} is required`);
      form && form.putMissField(name, missMsg);
      return false;
    }

    if (pattern && !pattern.test(value)) {
      console.warn(`${name} mismatch ${pattern}`);
      form && form.putMismatchField(name, mismatchMsg);
      return false;
    }

    return true;
  }

  handleBlur(e) {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
  }

  handleChange(e) {
    const {value} = e.target;
    const {onChange} = this.props;
    this.handleTextChange(value);
    onChange && onChange(e);
  }

  handleTextChange(value) {
    const {type, onTextChange} = this.props;
    switch (type) {
      case 'bankCard':
        value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      case 'phone':
        value = value.replace(/\D/g, '').substring(0, 11);
        const valueLen = value.length;
        if (valueLen > 3 && valueLen < 8) {
          value = `${value.substr(0, 3)} ${value.substr(3)}`;
        } else if (valueLen >= 8) {
          value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
        }
        break;
    }
    this.setState({value: value});
    onTextChange && onTextChange(value);
  }

  renderLabel() {
    const {label, labelWidth, mode, colon} = this.props;
    if (!label) {
      return null;
    }

    let children = label;
    const haveColon = colon && mode !== 'vertical';
    if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
      children = (label as string).replace(/[：|:]\s*$/, '');
    }

    return (
      <Column className={this.getClassName('label')}
              width={labelWidth}
      >
        <label title={typeof label === 'string' ? label : ''}>
          {children}
        </label>
      </Column>
    );

  }

  renderInput() {
    const {required, disabled, wrapperWidth, type, placeholder, name} = this.props;
    return (
      <Column className={this.getClassName('input')}
              width={wrapperWidth}
      >
        <input disabled={disabled}
               required={required}
               type={type}
               placeholder={placeholder}
               name={name}
               value={this.state.value}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
        />
      </Column>
    );
  }

  render() {
    const {mode} = this.props;

    const columns = mode === 'vertical' ? 1 : 2;

    return (
      <Grid columns={columns}
            className={this.getClassName('item')}
      >
        {this.renderLabel()}
        {this.renderInput()}
      </Grid>
    );
  }

}
