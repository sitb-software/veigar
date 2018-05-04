import Component from '../AbstractComponent';
import { ItemProps } from './index';

export default abstract class AbstractFormItem<P extends ItemProps, S> extends Component<P, S> {

  protected constructor(props, context) {
    super(props, context);
    const {name, form} = this.props;
    if (name && form) {
      form.formFields[name] = this;
    }
  }

  /**
   * 获取组件的值
   * @returns {string}
   */
  abstract getValue(): any;

  /**
   * 设置form组件的值
   * @param value 值
   */
  abstract setValue(value: any): void;

  /**
   * 组件校验
   * @returns {boolean}
   */
  abstract valid(): boolean;

}
