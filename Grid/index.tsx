import * as React from 'react';
import Component from '../AbstractComponent';
import Column, {Props as ColumnProps} from '../Column';
import './index.scss';

export const className = 'grid';

export interface Props {
  /**
   * The number of columns
   * default is 1
   */
  columns?: number
}

export {}

export default class Grid extends Component<Props> {

  static defaultProps = {
    columns: 1
  };

  renderChildren(children) {
    const {columns} = this.props;
    const columnWidth = 100 / (columns || 1);
    return React.Children.map(children, (item: React.ReactElement<ColumnProps>) => {
      if (!React.isValidElement(item)) {
        return item;
      }

      if (item.type !== Column) {
        return item;
      }

      return React.cloneElement<ColumnProps, ColumnProps>(item, {
        width: item.props.width || columnWidth
      });
    });
  }

  render() {
    const {children} = this.props;
    return (
      <div className={this.getClassName(className)}>
        {this.renderChildren(children)}
      </div>
    );
  }

}
