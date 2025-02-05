module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1636545357168, function(require, module, exports) {


exports.__esModule = true;

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (code, opts) {
  var stack = void 0;
  try {
    throw new Error();
  } catch (error) {
    if (error.stack) {
      stack = error.stack.split("\n").slice(1).join("\n");
    }
  }

  opts = (0, _assign2.default)({
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    preserveComments: false
  }, opts);

  var _getAst = function getAst() {
    var ast = void 0;

    try {
      ast = babylon.parse(code, opts);

      ast = _babelTraverse2.default.removeProperties(ast, { preserveComments: opts.preserveComments });

      _babelTraverse2.default.cheap(ast, function (node) {
        node[FROM_TEMPLATE] = true;
      });
    } catch (err) {
      err.stack = err.stack + "from\n" + stack;
      throw err;
    }

    _getAst = function getAst() {
      return ast;
    };

    return ast;
  };

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return useTemplate(_getAst(), args);
  };
};

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _has = require("lodash/has");

var _has2 = _interopRequireDefault(_has);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FROM_TEMPLATE = "_fromTemplate";
var TEMPLATE_SKIP = (0, _symbol2.default)();

function useTemplate(ast, nodes) {
  ast = (0, _cloneDeep2.default)(ast);
  var _ast = ast,
      program = _ast.program;


  if (nodes.length) {
    (0, _babelTraverse2.default)(ast, templateVisitor, null, nodes);
  }

  if (program.body.length > 1) {
    return program.body;
  } else {
    return program.body[0];
  }
}

var templateVisitor = {
  noScope: true,

  enter: function enter(path, args) {
    var node = path.node;

    if (node[TEMPLATE_SKIP]) return path.skip();

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    var replacement = void 0;

    if (t.isIdentifier(node) && node[FROM_TEMPLATE]) {
      if ((0, _has2.default)(args[0], node.name)) {
        replacement = args[0][node.name];
      } else if (node.name[0] === "$") {
        var i = +node.name.slice(1);
        if (args[i]) replacement = args[i];
      }
    }

    if (replacement === null) {
      path.remove();
    }

    if (replacement) {
      replacement[TEMPLATE_SKIP] = true;
      path.replaceInline(replacement);
    }
  },
  exit: function exit(_ref) {
    var node = _ref.node;

    if (!node.loc) _babelTraverse2.default.clearNode(node);
  }
};
module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1636545357168);
})()
//miniprogram-npm-outsideDeps=["babel-runtime/core-js/symbol","lodash/cloneDeep","lodash/assign","lodash/has","babel-traverse","babylon","babel-types"]
//# sourceMappingURL=index.js.map