import Component from '../AbstractComponent';

export default abstract class AbstractFormItem<P, S> extends Component<P, S> {

  /**
   * 获取组件的值
   * @returns {string}
   */
  abstract getValue(): any;

  /**
   * 组件校验
   * @returns {boolean}
   */
  abstract valid(): boolean;

}
