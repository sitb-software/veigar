import * as React from 'react';
import AbstractComponent from '../AbstractComponent';
import { Props } from './Props';
import './index.scss';

/**
 * @author Sean(sean.snow@live.com) createAt 18-2-8
 */
export class Dialog extends AbstractComponent<Props> {

  render() {

    const {style, children, loading, contentStyle, contentClassName, visible} = this.props;
    if (!visible) {
      return <div/>;
    }

    return (
      <div className={this.getClassName('dialog')}>
        <div className={this.getClassName('container', loading && 'loading')}
             style={style}
        >
          <div className={`${this.getClassName('content')} ${contentClassName}`}
               style={contentStyle}
          >
            {loading && (
              <img src={require('./ball-triangle.svg')}/>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }

}
