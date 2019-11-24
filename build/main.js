module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */
const {
  selection,
  Rectangle,
  SceneNode
} = __webpack_require__(/*! scenegraph */ "scenegraph");

const {
  editDocument
} = __webpack_require__(/*! application */ "application");

const {
  duplicate
} = __webpack_require__(/*! commands */ "commands");

function h(tag, props, ...children) {
  const element = document.createElement(tag);

  if (props) {
    if (props.nodeType || typeof props !== 'object') {
      children.unshift(props);
    } else {
      for (const name in props) {
        const value = props[name];

        if (name === 'style') {
          Object.assign(element.style, value);
        } else {
          element.setAttribute(name, value);
          element[name] = value;
        }
      }
    }
  }

  for (const child of children) {
    element.appendChild(typeof child === 'object' ? child : document.createTextNode(child));
  }

  return element;
}

let panel;

function create() {
  function rotateShape() {
    let angle = Number(document.querySelector('#angle').value);
    editDocument({
      editLabel: 'Rotate shape'
    }, s => {
      let selectedShape = s.items[0];
      angle = angle === 0 ? 1 : angle;
      const copies = Math.floor(360 / angle) - 1;

      for (let i = 0; i < copies; i += 1) {
        duplicate();
        selectedShape = s.items[0];
        selectedShape.rotateAround(angle, selectedShape.localCenterPoint);
      }
    });
  }

  const form = h('form', {
    method: 'dialog',
    id: 'main'
  }, h('h1', 'Rotate Copy'), h('hr'), h('p', 'Choose an angle between 1-360'), h('label', h('span', 'Angle'), h('input', {
    type: 'number',
    placeholder: '1',
    id: 'angle',
    uxpQuiet: true
  })), h('footer', h('button', {
    uxpVariant: 'cta',
    id: 'ok',
    type: 'submit'
  }, 'Apply')));
  const HTML = `
      <style>
          .show {
              display: block;
          }
          .hide {
              display: none;
          }
      </style>
      <p id="warning">This plugin requires you to select a shape in the document. Please select a shape.</p>
      
`;
  panel = document.createElement('div');
  panel.innerHTML = HTML;
  panel.appendChild(form);
  panel.querySelector('form').addEventListener('submit', rotateShape);
  return panel;
}

function show(event) {
  if (!panel) event.node.appendChild(create());
}

function hide(event) {// This function triggers when the panel is hidden by user
}

function update() {
  const form = document.querySelector('form');
  const warning = document.querySelector('#warning');

  if (selection.items.length === 0) {
    // || !(selection.items[0] instanceof Rectangle)) {
    form.className = 'hide';
    warning.className = 'show';
  } else {
    form.className = 'show';
    warning.className = 'hide';
  }
}

module.exports = {
  panels: {
    rotateCopy: {
      show,
      hide,
      update
    }
  }
};

/***/ }),

/***/ "application":
/*!******************************!*\
  !*** external "application" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("application");

/***/ }),

/***/ "commands":
/*!***************************!*\
  !*** external "commands" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("commands");

/***/ }),

/***/ "scenegraph":
/*!*****************************!*\
  !*** external "scenegraph" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scenegraph");

/***/ })

/******/ });