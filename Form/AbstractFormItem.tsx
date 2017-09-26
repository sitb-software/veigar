import Component from '../AbstractComponent';

export default abstract class AbstractFormItem<P, S> extends Component<P, S> {

  static isFormItem = true;

  componentDidMount() {
    const {name, form} = this.props;
    name && form && form.putFormField(name, this);
  }

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
