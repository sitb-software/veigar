import * as React from 'react';
import Component from '../AbstractComponent';


export interface Props {
  children?: any,
  selected?: boolean,
  disabled?: boolean,
  className?: string,
  /**
   * 如果存在生成a标签链接
   */
  href?: string
}

export class Item extends Component<Props, any> {

  static defaultProps = {
    selected: false,
    disabled: false
  };

  render() {

    const {selected, disabled, href, children} = this.props;

    const cls = {
      ['menu-item-selected']: selected,
      ['menu-item-disabled']: disabled
    };

    const aProps: any = {};
    if (href) {
      aProps.href = href;
    }

    return (
      <li className={this.getClassName('menu-item', cls)}>
        {href ? (
          <a {...aProps}>
            {children}
          </a>
        ) : children}
      </li>
    );
  }

}
