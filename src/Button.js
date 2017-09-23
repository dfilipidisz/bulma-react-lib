import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    children,
    className,
    type,
    ...rest
  } = props;

  let Component = null;

  switch (type) {
    case 'a':
    case 'button':
      Component = type;
      break;
    case 'submit':
      Component = <input type="submit" />;
      break;
    case 'reset':
      Component = <input type="reset" />;
      break;
  }

  return (
    <Component className={`button ${className}`}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.oneOf(['a', 'button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'a',
};

export default Button;
