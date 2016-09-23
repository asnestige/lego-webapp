/** @flow */

import React, { Component } from 'react';
import { Overlay } from 'react-overlays';
import cx from 'classnames';
import styles from './Dropdown.css';

type Props = {
  iconName: string;
  toggle: () => any;
  className?: string;
  contentClassName?: string|boolean;
  componentClass: any;
  show: boolean;
  children?: any;
  style?: any;
  placement: 'top'|'bottom'|'left'|'right';
};

export default class Dropdown extends Component {
  props: Props;
  target: any;

  static defaultProps = {
    iconName: 'star',
    componentClass: 'button',
    placement: 'bottom'
  };

  render() {
    const {
      iconName,
      toggle,
      show,
      contentClassName,
      className,
      children,
      style,
      placement
    } = this.props;

    const ComponentClass = this.props.componentClass;

    return (
      <ComponentClass
        onClick={toggle}
        ref={(target) => { this.target = target; }}
        className={className}
        style={style}
      >
        {iconName && <i className={`ion-${iconName}`} />}

        <Overlay
          show={show}
          onHide={toggle}
          target={this.target}
          placement={placement}
          rootClose
        >
          <div className={cx(styles.content, contentClassName)}>
            {children}
          </div>
        </Overlay>
      </ComponentClass>
    );
  }
}