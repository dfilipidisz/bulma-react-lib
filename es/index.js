import React from 'react';

var BreadcrumbItem = function BreadcrumbItem(props) {
  var label = props.label;


  return React.createElement(
    "li",
    null,
    React.createElement(
      "a",
      { href: "#" },
      label
    )
  );
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Breadcrumb = function Breadcrumb(props) {
  var children = props.children,
      rest = _objectWithoutProperties(props, ['children']);

  return React.createElement(
    'nav',
    _extends({ className: 'breadcrumb' }, rest),
    React.createElement(
      'ul',
      null,
      children
    )
  );
};

Breadcrumb.Item = BreadcrumbItem;

export { Breadcrumb };
