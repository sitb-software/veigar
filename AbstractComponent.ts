import {Component} from 'react';
import * as classNames from 'classnames';
import {classPrefix} from './styles'

const excludeFunc = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

/**
 * @author Sean(sean.snow@live.com) createAt 2017/8/28
 */
export default class AbstractComponent<P = {}, S = {}> extends Component<any, any> {

  constructor(props: P, content: S) {
    super(props, content);
    let propertyNames = Reflect.ownKeys(Reflect.getPrototypeOf(this));
    propertyNames.forEach((func: string) => {
      if (!excludeFunc.includes(func) && typeof this[func] === 'function') {
        this[func] = this[func].bind(this);
      }
    });
  }

  /**
   * 获取class name
   * @param cls class
   */
  getClassName(...cls): string {
    const {className} = this.props;
    let clsStr: string = classNames(...cls, className);
    clsStr = clsStr.replace(`${classPrefix} `, '');
    return `${classPrefix} ${clsStr}`;
  }

}
