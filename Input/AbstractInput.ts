/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
import AbstractFormItem from '../Form/AbstractFormItem';
import { ItemProps } from '../Form/index';

export interface BaseProps extends ItemProps {
  /**
   * 表明字段是必须填写的
   */
  required?: boolean
  /**
   * 当input没有填写值时提示的错误信息
   */
  missMsg?: string
  /**
   * 正则表达式用于判断输入的值是否符合预期
   */
  pattern?: RegExp
  /**
   * 与正则表达式不匹配错误消息
   */
  mismatchMsg?: string
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
      this.setValue({miss: true});
      return false;
    }

    if (pattern && !pattern.test(value)) {
      console.warn(`${name} mismatch ${pattern}`);
      form && form.putMismatchField(name, mismatchMsg);
      this.setValue({mismatch: true});
      return false;
    }

    this.setState({miss: false, mismatch: false, error: false});
    return true;
  }

}
