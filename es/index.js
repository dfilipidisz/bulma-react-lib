import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var Box = function Box(props) {
  var children = props.children,
      className = props.className,
      rest = objectWithoutProperties(props, ['children', 'className']);


  return React.createElement(
    'div',
    _extends({ className: 'box ' + (className || '') }, rest),
    children
  );
};

Box.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
};

var COLORS = ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'];
var SIZES = ['small', 'normal', 'medium', 'large'];

var mapColorToClass = function mapColorToClass(color) {
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
    'is-danger': color === 'danger'
  };
};

var mapSizeToClass = function mapSizeToClass(size) {
  return {
    'is-small': size === 'small',
    'is-medium': size === 'medium',
    'is-large': size === 'large'
  };
};

var Button = function Button(props) {
  var children = props.children,
      className = props.className,
      type = props.type,
      color = props.color,
      size = props.size,
      outlined = props.outlined,
      inverted = props.inverted,
      hovered = props.hovered,
      focus = props.focus,
      active = props.active,
      loading = props.loading,
      isStatic = props.static,
      disabled = props.disabled,
      rest = objectWithoutProperties(props, ['children', 'className', 'type', 'color', 'size', 'outlined', 'inverted', 'hovered', 'focus', 'active', 'loading', 'static', 'disabled']);


  var Component = null;
  var customProps = {};

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

  var compClass = cn('button', className, mapColorToClass(color), mapSizeToClass(size), 'is-outlined', 'is-inverted', 'is-hovered', 'is-focused', 'is-active', 'is-loading', 'is-static');

  // 'input' is self-closing, doesn't have children. sad story.
  if (type === 'submit' || type === 'reset') {
    return React.createElement(Component, _extends({ className: compClass, disabled: disabled }, customProps, rest));
  }

  return React.createElement(
    Component,
    _extends({ className: compClass, disabled: disabled }, customProps, rest),
    children
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
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
  disabled: PropTypes.bool
};

Button.defaultProps = {
  type: 'a'
};

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

var Breadcrumb = function Breadcrumb(props) {
  var children = props.children,
      rest = objectWithoutProperties(props, ['children']);


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

// Elements

export { Box, Button, Breadcrumb };
