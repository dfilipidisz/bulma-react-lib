import React from 'react';

const BreadcrumbItem = (props) => {
  const { label } = props;

  return (
    <li><a href="#">{label}</a></li>
  );
};

export default BreadcrumbItem;
