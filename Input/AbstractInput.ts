/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
import AbstractFormItem from '../Form/AbstractFormItem';
import { ItemProps } from '../Form/index';

export interface BaseProps extends ItemProps {
  /**
   * 是否校验input
   */
  validate?: boolean
  /**
   * 当input没有填写值时提示的错误信息
   */
  missMsg?: string

  /**
   * 与正则表达式不匹配错误消息
   */
  mismatchMsg?: string

  errorMsg?: string

  /**
   * 表明字段是必须填写的
   */
  required?: boolean

  /**
   * 正则表达式用于判断输入的值是否符合预期
   */
  pattern?: RegExp

}

export abstract class AbstractInput<P extends BaseProps, S> extends AbstractFormItem<P, S> {

  state = {
    value: '',
    miss: false,
    mismatch: false,
    error: false
  };

  getValue(): any {
    return this.state.value;
  }

  setValue(value: any) {
    return this.setState({value});
  }

  /**
   * 处理onChange事件
   * @param event
   */
  handleChange(event) {
    const {onChange, validate} = this.props;
    const value = event.target.value;
    this.setState({value});
    onChange && onChange(event);
    // 等于undefined 表明没有传值,则为true 开始校验Input
    (validate === undefined || validate) && this.valid();
  }

  /**
   * input输入的值是否正确
   * @returns {boolean}
   */
  isError(): boolean {
    const {miss, mismatch, error} = this.state;
    return miss || mismatch || error;
  }

  valid(): boolean {
    const {
      required, missMsg,
      pattern, mismatchMsg,
      name, form,
    } = this.props;

    const {value} = this.state;
    if (required && value === '') {
      console.warn(`${name} is required`);
      form && form.putMissField(name, missMsg);
      this.setState({miss: true});
      return false;
    }

    if (pattern && !pattern.test(value)) {
      console.warn(`${name} mismatch ${pattern}`);
      form && form.putMismatchField(name, mismatchMsg);
      this.setState({mismatch: true});
      return false;
    }

    this.setState({miss: false, mismatch: false, error: false});
    return true;
  }

}
