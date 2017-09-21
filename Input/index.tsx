import * as React from 'react';
import Component from '../AbstractComponent';
import {Row, Col} from '../GridLayout';

import {ItemProps} from '../Form/index';

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
    const {label, mode, colon} = this.props;
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
      <label className={this.getClassName('form-item-label')}
             title={typeof label === 'string' ? label : ''}
      >
        {children}
      </label>
    );

  }

  renderInput() {
    const {required, disabled} = this.props;
    return (
      <Col>
        <input disabled={disabled}
               required={required}
        />
      </Col>
    );
  }

  render() {
    const {mode} = this.props;

    const clsPrefix = 'form-item';
    const cls = {
      [`${clsPrefix}-${mode}`]: true
    };

    return (
      <Row className={this.getClassName(clsPrefix, cls)}>
        {this.renderLabel()}
        {this.renderInput()}
      </Row>
    );
  }

}
