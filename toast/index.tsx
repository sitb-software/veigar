import * as React from 'react';
import { render } from 'react-dom';
import Component from '../AbstractComponent';
import './index.scss';
import { ReactNode } from 'react';

const id = 'veigar-toast-root';

export interface ToastProps {
  after?: ReactNode
  before?: ReactNode
  position?: 'top' | 'bottom' | 'center'
  duration?: number
}

class Toast extends Component<ToastProps> {

  static defaultProps = {
    position: 'top',
    duration: 2500
  };

  closeTask;

  componentDidMount() {
    const {duration} = this.props;
    this.closeTask = setTimeout(this.handleClose, duration);
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  handleClose() {
    const root = document.getElementById(id);
    root && document.body.removeChild(root);
    const {onClose} = this.props;
    onClose && onClose();
  }

  clearTimeout() {
    this.closeTask && clearTimeout(this.closeTask);
    this.closeTask = null;
  }

  render() {
    const {before, after, children, position} = this.props;
    return (
      <div className={this.getClassName('toast', position)}>
        <div className={this.getClassName('container')}>
          {before}
          {typeof children === 'string' ? (
            <div className={this.getClassName('content')}>
              {children}
            </div>
          ) : children}
          {after}
        </div>
      </div>
    );
  }

}

export function toast(args: ({
  content: any;
  duration?: any;
  onClose?: any;
} & ToastProps) | string) {

  let params: any = args;
  if (typeof args === 'string') {
    params = {content: args};
  }
  const {content, duration, onClose, ...other} = params;
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);
  }
  const props = {
    ...other,
    children: content,
    duration,
    onClose
  };

  render(<Toast {...props}/>, container);
}

