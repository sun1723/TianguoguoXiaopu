module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1636545357152, function(require, module, exports) {


exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function isString(node) {
    return t.isLiteral(node) && typeof node.value === "string";
  }

  function buildBinaryExpression(left, right) {
    return t.binaryExpression("+", left, right);
  }

  return {
    visitor: {
      TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
        var node = path.node;

        var quasi = node.quasi;
        var args = [];

        var strings = [];
        var raw = [];

        for (var _iterator = quasi.quasis, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var elem = _ref2;

          strings.push(t.stringLiteral(elem.value.cooked));
          raw.push(t.stringLiteral(elem.value.raw));
        }

        strings = t.arrayExpression(strings);
        raw = t.arrayExpression(raw);

        var templateName = "taggedTemplateLiteral";
        if (state.opts.loose) templateName += "Loose";

        var templateObject = state.file.addTemplateObject(templateName, strings, raw);
        args.push(templateObject);

        args = args.concat(quasi.expressions);

        path.replaceWith(t.callExpression(node.tag, args));
      },
      TemplateLiteral: function TemplateLiteral(path, state) {
        var nodes = [];

        var expressions = path.get("expressions");

        for (var _iterator2 = path.node.quasis, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
          var _ref3;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
          }

          var elem = _ref3;

          nodes.push(t.stringLiteral(elem.value.cooked));

          var expr = expressions.shift();
          if (expr) {
            if (state.opts.spec && !expr.isBaseType("string") && !expr.isBaseType("number")) {
              nodes.push(t.callExpression(t.identifier("String"), [expr.node]));
            } else {
              nodes.push(expr.node);
            }
          }
        }

        nodes = nodes.filter(function (n) {
          return !t.isLiteral(n, { value: "" });
        });

        if (!isString(nodes[0]) && !isString(nodes[1])) {
          nodes.unshift(t.stringLiteral(""));
        }

        if (nodes.length > 1) {
          var root = buildBinaryExpression(nodes.shift(), nodes.shift());

          for (var _iterator3 = nodes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
            var _ref4;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref4 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref4 = _i3.value;
            }

            var node = _ref4;

            root = buildBinaryExpression(root, node);
          }

          path.replaceWith(root);
        } else {
          path.replaceWith(nodes[0]);
        }
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1636545357152);
})()
//miniprogram-npm-outsideDeps=["babel-runtime/core-js/get-iterator"]
//# sourceMappingURL=index.js.map