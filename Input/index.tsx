import * as React from 'react';
import Component from '../AbstractComponent';
import Grid from '../Grid';
import Column from '../Column';
import {ItemProps} from '../Form/index';
import './index.scss';

export interface Props extends ItemProps {
  label?: React.ReactNode;
  colon?: boolean,
  required?: boolean,
  pattern?: RegExp,
  errMsg?: string,
  missMsg?: string
}

export default class Input extends Component<Props, any> {

  static defaultProps = {
    mode: 'horizontal',
    colon: true
  };

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

    // const cls = {
    //
    // };

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
