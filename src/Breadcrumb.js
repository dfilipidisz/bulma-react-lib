import React from 'react';

import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = (props) => {
  const { children, ...rest } = props;

  return (
    <nav className="breadcrumb" {...rest}>
      <ul>
        {children}
      </ul>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
