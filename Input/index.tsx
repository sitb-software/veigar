import * as React from 'react';
import Grid from '../Grid';
import Column from '../Column';
import { lang } from '../locale/zh-cn';
import field from '../Form/field';
import { AbstractInput, BaseProps } from './AbstractInput';

import './index.scss';

export interface Props extends BaseProps {

  defaultValue?: string;

  label?: React.ReactNode;
  colon?: boolean,

  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode

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

@field
export default class Input extends AbstractInput<Props, any> {

  static defaultProps = {
    mode: 'horizontal',
    colon: true
  };

  constructor(props: Props, context) {
    super(props, context);
    this.state.value = props.defaultValue || '';
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
      case 'tel':
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

  renderAddon(cls, addon) {
    if (!addon) {
      return null;
    }
    return (
      <div className={cls}>
        {addon}
      </div>
    );
  }

  renderInput() {
    const {
      required, disabled, wrapperWidth, type, placeholder, name,
      maxLength,
      addonAfter,
      addonBefore
    } = this.props;
    if (!type) {
      console.warn(lang.inputTypePoint);
    }
    return (
      <Column className={this.getClassName('input')}
              width={wrapperWidth}
      >
        {this.renderAddon('before', addonBefore)}
        <input disabled={disabled}
               required={required}
               type={type}
               placeholder={placeholder}
               name={name}
               value={this.state.value}
               maxLength={maxLength}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
        />
        {this.renderAddon('after', addonAfter)}
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
