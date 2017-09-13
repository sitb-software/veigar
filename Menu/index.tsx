import * as React from 'react';
import Component from '../AbstractComponent';
import {Item, Props as ItemProps} from "./Item";
import './index.scss';

export interface Props {
  activeKey?: string,
  className?: string,
  submenu?: boolean,
  mode: 'vertical' | 'horizontal' | 'inline'
}

export {Item};

export default class Menu extends Component<Props, any> {

  static defaultProps = {
    mode: 'horizontal',
    submenu: false
  };

  renderChildren(children) {
    const {activeKey} = this.props;

    return React.Children.map(children, (child: React.ReactElement<ItemProps>) => {
      if (!React.isValidElement(child)) {
        console.warn('child not valid element.', child);
        return child;
      }
      // 检查是否有子菜单
      const itemChildren = React.Children.map(child.props.children, (item: any) => {
        if (item && item.type === Menu) {
          return React.cloneElement(item, {
            submenu: true
          });
        }
        return item;
      });

      if (child.type !== Item) {
        console.warn('子节点不是一个有效的菜单节点', child);
        return child;
      }

      return React.cloneElement<any, ItemProps>(child, {
        selected: activeKey === child.key,
        children: itemChildren
      });
    });
  }

  render() {
    const {mode, submenu, children} = this.props;
    const cls = {
      [`menu-${mode}`]: true,
      submenu
    };
    return (
      <ul className={this.getClassName('menu', cls)}>
        {this.renderChildren(children)}
      </ul>
    );
  }

}
