module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1636545357110, function(require, module, exports) {


exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (path, emit) {
  var kind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var";

  path.traverse(visitor, { kind: kind, emit: emit });
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitor = {
  Scope: function Scope(path, state) {
    if (state.kind === "let") path.skip();
  },
  Function: function Function(path) {
    path.skip();
  },
  VariableDeclaration: function VariableDeclaration(path, state) {
    if (state.kind && path.node.kind !== state.kind) return;

    var nodes = [];

    var declarations = path.get("declarations");
    var firstId = void 0;

    for (var _iterator = declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var declar = _ref;

      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(t.expressionStatement(t.assignmentExpression("=", declar.node.id, declar.node.init)));
      }

      for (var name in declar.getBindingIdentifiers()) {
        state.emit(t.identifier(name), name);
      }
    }

    if (path.parentPath.isFor({ left: path.node })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  }
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1636545357110);
})()
//miniprogram-npm-outsideDeps=["babel-runtime/core-js/get-iterator","babel-types"]
//# sourceMappingURL=index.js.map