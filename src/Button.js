import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { COLORS, SIZES } from './constants';

const mapColorToClass = (color) => {
  return {
    'is-white': color === 'white',
    'is-light': color === 'light',
    'is-dark': color === 'dark',
    'is-black': color === 'black',
    'is-link': color === 'link',
    'is-primary': color === 'primary',
    'is-info': color === 'info',
    'is-success': color === 'success',
    'is-warning': color === 'warning',
    'is-danger': color === 'danger',
  };
};

const mapSizeToClass = (size) => {
  return {
    'is-small': size === 'small',
    'is-medium': size === 'medium',
    'is-large': size === 'large',
  };
};

const Button = (props) => {
  const {
    children,
    className,
    type,
    color,
    size,
    outlined,
    inverted,
    hovered,
    focus,
    active,
    loading,
    static: isStatic,
    disabled,
    ...rest
  } = props;

  let Component = null;
  let customProps = {};

  switch (type) {
    case 'a':
    case 'button':
      Component = type;
      break;
    case 'submit':
      Component = 'input';
      customProps.type = 'submit';
      break;
    case 'reset':
      Component = 'input';
      customProps.type = 'reset';
      break;
  }

  const compClass = cn('button', className,
    mapColorToClass(color),
    mapSizeToClass(size),
    'is-outlined': outlined,
    'is-inverted': inverted,
    'is-hovered': hovered,
    'is-focused': focus,
    'is-active': active,
    'is-loading': loading,
    'is-static': isStatic,
  );

  // 'input' is self-closing, doesn't have children. sad story.
  if (type === 'submit' || type === 'reset') {
    return (
      <Component className={compClass} disabled={disabled} {...customProps} {...rest} />
    );
  }

  return (
    <Component className={compClass} disabled={disabled} {...customProps} {...rest}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  className: PropTypes.string,
  type: PropTypes.oneOf(['a', 'button', 'submit', 'reset']),
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  outlined: PropTypes.bool,
  inverted: PropTypes.bool,
  hovered: PropTypes.bool,
  focus: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  static: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'a',
};

export default Button;
