import React from 'react';
import PropTypes from 'prop-types';

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
    _extends({ className: 'box ' + className }, rest),
    children
  );
};

Box.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
};

var Button = function Button(props) {
  var children = props.children,
      className = props.className,
      type = props.type,
      rest = objectWithoutProperties(props, ['children', 'className', 'type']);


  var Component = null;

  switch (type) {
    case 'a':
    case 'button':
      Component = type;
      break;
    case 'submit':
      Component = React.createElement('input', { type: 'submit' });
      break;
    case 'reset':
      Component = React.createElement('input', { type: 'reset' });
      break;
  }

  return React.createElement(
    Component,
    { className: 'button ' + className },
    children
  );
};

Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.oneOf(['a', 'button', 'submit', 'reset'])
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
