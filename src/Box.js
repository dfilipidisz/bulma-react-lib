import React from 'react';
import PropTypes from 'prop-types';

const Box = (props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <div className={`box ${className}`} {...rest}>
      {children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
};

export default Box;
