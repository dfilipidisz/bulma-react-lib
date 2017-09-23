import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    children,
    className,
    type,
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

  const compClass = cn('button', className);

  // 'input' is self-closing, doesn't have children. sad story.
  if (type === 'submit' || type === 'reset') {
    return (
      <Component className={compClass} {...customProps} {...rest} />
    );
  }

  return (
    <Component className={compClass} {...customProps} {...rest}>
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
};

Button.defaultProps = {
  type: 'a',
};

export default Button;
