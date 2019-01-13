import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Props } from './BaseProps';

/**
 * @returns {number} 浏览器视口的高度
 */
function getWindowHeight() {
  let windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

/**
 * 文档的高度
 */
function getScrollHeight() {
  let bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
}

/**
 * 滚动条在Y轴上的滚动距离
 */
function getScrollTop() {
  let bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
}

/**
 * @author Sean(sean.snow@live.com) createAt 18-3-12
 */
export class ListBase extends React.Component<Props> {

  static defaultProps = {
    onEndReachedThreshold: 0
  };

  componentDidMount() {
    const {useBodyScroll} = this.props;
    if (useBodyScroll) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    const {useBodyScroll, onEndReached, onEndReachedThreshold = 0} = this.props;
    const dom: any = findDOMNode(this);
    if (useBodyScroll) {
      if (getScrollHeight() - getScrollTop() - getWindowHeight() <= onEndReachedThreshold) {
        onEndReached && onEndReached();
      }
    } else {
      let scrollHeight = dom.scrollHeight;
      let scrollTop = dom.scrollTop;
      let domHeight = dom.clientHeight;
      if (scrollHeight - scrollTop - domHeight <= onEndReachedThreshold) {
        onEndReached && onEndReached();
      }
    }
  }

  render() {
    const {
      useBodyScroll,
      data,
      renderHeader,
      renderFooter,
      renderItem,
      component: Component = 'div',
      ...props
    } = this.props;

    const newProps: any = {
      ...props
    };
    if (useBodyScroll) {
      newProps.onScroll = null;
    } else {
      newProps.onScroll = this.handleScroll;
    }

    return (
      <Component {...newProps}>
        {renderHeader && renderHeader()}
        {data.map(renderItem)}
        {renderFooter && renderFooter()}
      </Component>
    );
  }

}
