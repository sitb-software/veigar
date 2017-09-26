import * as React from 'react';
import {render} from 'react-dom';
import Component from '../AbstractComponent';
import './index.scss';

const id = 'veigar-toast-root';

const variables = {
  config: {
    position: 'top',
    /**
     * 成功图标
     */
    success: null,
    /**
     * 失败图标
     */
    error: null,
    /**
     * 图标和内容显示模式
     * 'vertical' | 'horizontal'
     */
    mode: 'horizontal',
    duration: 2500
  }
};

/**
 * 配置参数
 * @param {{}} conf
 */
export function setConfig(conf = {}) {
  variables.config = {
    ...variables.config,
    ...conf
  };
}

class Toast extends Component {

  closeTask;

  componentDidMount() {
    const {duration: userDuration} = this.props;
    const {duration: defaultDuration} = variables.config;
    const duration = userDuration || defaultDuration;
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
    const {type, children} = this.props;
    const {position, success, error, mode} = variables.config;
    let icon = null;
    switch (type) {
      case 'success':
        icon = success;
        break;
      case 'error':
        icon = error;
        break;
    }
    return (
      <div className={this.getClassName('toast', type, position, mode)}>
        {icon && (
          <div className={this.getClassName('icon')}>
            {icon}
          </div>
        )}
        {typeof children === 'string' ? (
          <div className={this.getClassName('content')}>
            {children}
          </div>
        ) : children}
      </div>
    );
  }

}

function toast({content, type, duration, onClose}) {
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);
  }
  const props = {
    children: content,
    type,
    duration,
    onClose
  };

  render(<Toast {...props}/>, container);
}

export function success(content: React.ReactNode, duration?: number, onClose?: Function) {
  toast({
    type: 'success',
    content,
    duration,
    onClose
  });
}

export function error(content: React.ReactNode, duration?: number, onClose?: Function) {
  toast({
    type: 'error',
    content,
    duration,
    onClose
  });
}
