/*!
 * Cursor.js v1.0.2
 * Copyright (c) 2021 Matozz
 * Released under the MIT License.
*/
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cursor.ts":
/*!***********************!*\
  !*** ./src/cursor.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _portal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./portal */ \"./src/portal.ts\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ \"./src/style.ts\");\n\n\nvar cursor;\nvar DEFAULT_CURSOR_SIZE;\nvar CursorLockedMode = false;\nvar CursorHolding = false;\nvar Cursor = {\n  start: function start() {\n    if (!document.body) {\n      console.warn(\"Unable to initialise, document.body does not exist.\");\n      return;\n    }\n\n    // Inject default style\n    document.body.insertAdjacentHTML('afterbegin', _style__WEBPACK_IMPORTED_MODULE_1__.style);\n\n    // Create cursor container\n    cursor = (0,_portal__WEBPACK_IMPORTED_MODULE_0__.createPortalElement)('cursor');\n    document.body.appendChild(cursor);\n    cursor.appendChild((0,_portal__WEBPACK_IMPORTED_MODULE_0__.createPortalElement)('content'));\n    DEFAULT_CURSOR_SIZE = cursor.style.getPropertyValue('--height');\n\n    // Initalize the styled cursors\n    handleCursorMove();\n    handleButtonCursor();\n    handleSelectCursor();\n    handleIconCursor();\n  }\n};\nvar handleCursorReset = function handleCursorReset() {\n  CursorLockedMode = false;\n  cursor.style.setProperty('--translateY', \"0px\");\n  cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);\n  cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);\n};\nvar handleCursorMove = function handleCursorMove() {\n  document.addEventListener('mousedown', function () {\n    if (!CursorLockedMode) {\n      cursor.style.setProperty('--scale', '0.9');\n    }\n  });\n  document.addEventListener('mouseup', function () {\n    if (!CursorLockedMode) {\n      cursor.style.setProperty('--scale', '1');\n    }\n  });\n  document.addEventListener('mousemove', function (_ref) {\n    var x = _ref.pageX,\n      y = _ref.pageY;\n    if (CursorLockedMode !== 'button') {\n      cursor.style.setProperty('--top', y + 'px');\n      cursor.style.setProperty('--left', x + 'px');\n    }\n  });\n};\nvar handleButtonCursor = function handleButtonCursor() {\n  document.querySelectorAll('button').forEach(function (btn) {\n    var rect;\n    btn.addEventListener('mouseenter', function (e) {\n      CursorLockedMode = 'button';\n      var target = e.target;\n      if (target) {\n        rect = target.getBoundingClientRect();\n        cursor.classList.add('is-locked', 'locked-mode__button');\n        cursor.style.setProperty('--top', window.scrollY + rect.top + rect.height / 2 + 'px');\n        cursor.style.setProperty('--left', window.scrollX + rect.left + rect.width / 2 + 'px');\n        cursor.style.setProperty('--width', rect.width + 'px');\n        cursor.style.setProperty('--height', rect.height + 'px');\n        target.style.setProperty('--scale', '1.05');\n      }\n    }, {\n      passive: true\n    });\n    btn.addEventListener('mousemove', function (e) {\n      var target = e.target;\n      if (target) {\n        var halfHeight = rect.height / 2;\n        var topOffset = (e.y - rect.top - halfHeight) / halfHeight;\n        var halfWidth = rect.width / 2;\n        var leftOffset = (e.x - rect.left - halfWidth) / halfWidth;\n        cursor.style.setProperty('--translateX', \"\".concat(leftOffset * 3, \"px\"));\n        cursor.style.setProperty('--translateY', \"\".concat(topOffset * 3, \"px\"));\n        target.style.setProperty('--translateX', \"\".concat(leftOffset * 5, \"px\"));\n        target.style.setProperty('--translateY', \"\".concat(topOffset * 3, \"px\"));\n      }\n    }, {\n      passive: true\n    });\n    btn.addEventListener('mouseleave', function (e) {\n      CursorLockedMode = false;\n      var target = e.target;\n      if (target) {\n        cursor.classList.remove('is-locked', 'locked-mode__button');\n        cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);\n        cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);\n        cursor.style.setProperty('--translateX', '0');\n        cursor.style.setProperty('--translateY', '0');\n        target.style.setProperty('--translateX', '0');\n        target.style.setProperty('--translateY', '0');\n        target.style.setProperty('--scale', '1');\n      }\n    }, {\n      passive: true\n    });\n  });\n};\nvar handleSelectCursor = function handleSelectCursor() {\n  var rect;\n  var inRange = false;\n  var handleDeSelect = function handleDeSelect() {\n    handleCursorReset();\n    cursor.style.setProperty('--scale', '1');\n    cursor.classList.remove('locked-mode__select');\n  };\n  var selectorList = ['p', 'input'];\n  document.querySelectorAll(selectorList.join(',')).forEach(function (p) {\n    p.addEventListener('mouseenter', function (e) {\n      CursorLockedMode = 'select';\n      inRange = true;\n      var target = e.target;\n      cursor.classList.add('locked-mode__select');\n      if (target) {\n        rect = target.getBoundingClientRect();\n      }\n    }, {\n      passive: true\n    });\n    p.addEventListener('mousedown', function (e) {\n      if (CursorLockedMode === 'select') {\n        CursorHolding = true;\n        cursor.style.setProperty('--scale', '0.8');\n      }\n    }, {\n      passive: true\n    });\n    p.addEventListener('mouseup', function () {\n      cursor.style.setProperty('--scale', '1');\n    });\n    p.addEventListener('mousemove', function (e) {\n      var halfHeight = rect.height / 2;\n      var topOffset = (e.y - rect.top - halfHeight) / halfHeight;\n      cursor.style.setProperty('--translateY', \"\".concat(-topOffset * 5 + 0.7, \"px\"));\n      cursor.style.setProperty('--width', '0.2em');\n      cursor.style.setProperty('--height', '1.5em');\n    }, {\n      passive: true\n    });\n    p.addEventListener('mouseleave', function () {\n      inRange = false;\n      if (CursorHolding) return;\n      handleDeSelect();\n    }, {\n      passive: true\n    });\n    document.addEventListener('mouseup', function () {\n      if (CursorLockedMode === 'select') {\n        CursorHolding = false;\n        if (!inRange) handleDeSelect();\n      }\n    });\n  });\n};\nvar handleIconCursor = function handleIconCursor() {\n  document.querySelectorAll('#icon').forEach(function (icon) {\n    var rect;\n    icon.addEventListener('mouseenter', function (e) {\n      CursorLockedMode = 'icon';\n      var target = e.target;\n      if (target) {\n        rect = target.getBoundingClientRect();\n        cursor.classList.add('locked-mode__icon');\n        cursor.style.setProperty('--top', rect.top + rect.height / 2 + 'px');\n        cursor.style.setProperty('--left', rect.left + rect.width / 2 + 'px');\n        // cursor.style.setProperty('--width', rect.width + 'px');\n        // cursor.style.setProperty('--height', rect.height + 'px');\n        // cursor.style.opacity = '0';\n\n        target.style.setProperty('--scale', '1.1');\n      }\n    }, {\n      passive: true\n    });\n    icon.addEventListener('mousemove', function (e) {\n      var target = e.target;\n      if (target) {\n        var halfHeight = rect.height / 2;\n        var topOffset = (e.y - rect.top - halfHeight) / halfHeight;\n        var halfWidth = rect.width / 2;\n        var leftOffset = (e.x - rect.left - halfWidth) / halfWidth;\n        cursor.style.setProperty('--translateX', \"\".concat(leftOffset * 3, \"px\"));\n        cursor.style.setProperty('--translateY', \"\".concat(topOffset * 3, \"px\"));\n        target.style.setProperty('--translateX', \"\".concat(leftOffset * 5, \"px\"));\n        target.style.setProperty('--translateY', \"\".concat(topOffset * 3, \"px\"));\n      }\n    }, {\n      passive: true\n    });\n    icon.addEventListener('mouseleave', function (e) {\n      CursorLockedMode = false;\n      var target = e.target;\n      if (target) {\n        cursor.classList.remove('locked-mode__icon');\n        cursor.style.setProperty('--width', DEFAULT_CURSOR_SIZE);\n        cursor.style.setProperty('--height', DEFAULT_CURSOR_SIZE);\n        cursor.style.setProperty('--translateX', '0');\n        cursor.style.setProperty('--translateY', '0');\n        target.style.setProperty('--translateX', '0');\n        target.style.setProperty('--translateY', '0');\n        target.style.setProperty('--scale', '1');\n        // cursor.style.opacity = '1';\n      }\n    }, {\n      passive: true\n    });\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cursor);\n\n//# sourceURL=webpack://Cursor/./src/cursor.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.ts\");\n\n_cursor__WEBPACK_IMPORTED_MODULE_0__[\"default\"].start();\n\n//# sourceURL=webpack://Cursor/./src/index.ts?");

/***/ }),

/***/ "./src/portal.ts":
/*!***********************!*\
  !*** ./src/portal.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPortalElement\": () => (/* binding */ createPortalElement)\n/* harmony export */ });\nfunction createPortalElement(type, options) {\n  var portal = document.createElement('div');\n  if (type == 'cursor') {\n    portal.classList.add(\"cursor-js\");\n    for (var key in options) {\n      portal.style[key] = options[key];\n    }\n    return portal;\n  } else {\n    portal.classList.add(\"cursor-js__\".concat(type));\n    for (var _key in options) {\n      portal.style[_key] = options[_key];\n    }\n    return portal;\n  }\n}\n\n//# sourceURL=webpack://Cursor/./src/portal.ts?");

/***/ }),

/***/ "./src/style.ts":
/*!**********************!*\
  !*** ./src/style.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"style\": () => (/* binding */ style)\n/* harmony export */ });\nvar style = \"\\n<style>\\n*,\\n*:hover {\\n  cursor: none;\\n}\\n\\n#icon {\\n  height: 55px;\\n  width: 55px;\\n  margin-right: 8px;\\n  border-radius: 14px;\\n  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));\\n          transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));\\n  -webkit-transition-duration: 0.1s;\\n          transition-duration: 0.1s;\\n  -webkit-transition-timing-function: ease-out;\\n          transition-timing-function: ease-out;\\n  -webkit-transition-property: opacity, -webkit-transform;\\n  transition-property: opacity, -webkit-transform;\\n  transition-property: opacity, transform;\\n  transition-property: opacity, transform, -webkit-transform;\\n  -webkit-box-shadow: 1px 2px 10px 1px rgba(0, 0, 0, 0.2);\\n          box-shadow: 1px 2px 10px 1px rgba(0, 0, 0, 0.2);\\n  --scale: 1;\\n}\\n\\n#icon:active {\\n  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(1);\\n          transform: translate(var(--translateX), var(--translateY)) scale(1);\\n}\\n\\nbutton {\\n  border: none;\\n  background-color: transparent;\\n  color: #007aff;\\n  font-size: 1em;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  padding: 0.6em 0.8em;\\n  position: relative;\\n  text-decoration: none;\\n  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));\\n          transform: translate(var(--translateX), var(--translateY)) scale(var(--scale));\\n  -webkit-transition-duration: 0.1s;\\n          transition-duration: 0.1s;\\n  -webkit-transition-timing-function: ease-out;\\n          transition-timing-function: ease-out;\\n  -webkit-transition-property: opacity, -webkit-transform;\\n  transition-property: opacity, -webkit-transform;\\n  transition-property: opacity, transform;\\n  transition-property: opacity, transform, -webkit-transform;\\n  z-index: 1;\\n  font-family: 'Roboto', sans-serif;\\n  --scale: 1;\\n  --translateX: 0;\\n  --translateY: 0;\\n}\\n\\nbutton * {\\n  pointer-events: none;\\n}\\n\\nbutton:not(:hover) {\\n  -webkit-transition-property: opacity, -webkit-transform;\\n  transition-property: opacity, -webkit-transform;\\n  transition-property: transform, opacity;\\n  transition-property: transform, opacity, -webkit-transform;\\n}\\n\\nbutton:active {\\n  opacity: 0.5;\\n  -webkit-transform: translate(var(--translateX), var(--translateY)) scale(1);\\n          transform: translate(var(--translateX), var(--translateY)) scale(1);\\n}\\n\\n.cursor-js {\\n  height: var(--height);\\n  left: var(--left);\\n  pointer-events: none;\\n  top: var(--top);\\n  -webkit-transform: translate(-50%, -50%) scale(var(--scale));\\n          transform: translate(-50%, -50%) scale(var(--scale));\\n  -webkit-transition-property: width, height, transform;\\n  transition-property: width, height, transform;\\n  width: var(--width);\\n  --top: -1em;\\n  --left: -1em;\\n  --width: 1em;\\n  --height: 1em;\\n  --scale: 1;\\n  --translateX: 0;\\n  --translateY: 0;\\n}\\n\\n.cursor-js.is-locked {\\n  -webkit-transition-property: width, height, left, top, opacity;\\n  transition-property: width, height, left, top, opacity;\\n}\\n\\n.cursor-js.is-locked .cursor-js__content {\\n  opacity: 0.06;\\n}\\n\\n.cursor-js.locked-mode__select {\\n  will-change: auto\\n}\\n\\n.cursor-js.locked-mode__icon {\\n  -webkit-transition-property: height;\\n  transition-property: height;\\n  -webkit-transition-duration: 0.1s;\\n          transition-duration: 0.1s;\\n  -webkit-box-shadow: 0px 0px 30px 12px #ffffff;\\n          box-shadow: 0px 0px 30px 12px #ffffff;\\n  width: 0;\\n  height: 0;\\n}\\n\\n.cursor-js.locked-mode__icon .cursor-js__content {\\n  opacity: 0;\\n  -webkit-transition-duration: 0.1s;\\n          transition-duration: 0.1s;\\n  background-color: transparent;\\n}\\n\\n.cursor-js, .cursor-js__content {\\n  position: absolute;\\n  -webkit-transition-duration: 0.2s;\\n          transition-duration: 0.2s;\\n  -webkit-transition-timing-function: ease-out;\\n          transition-timing-function: ease-out;\\n}\\n\\n.cursor-js__content {\\n  background-color: #000;\\n  border-radius: 0.6em;\\n  bottom: 0;\\n  left: 0;\\n  opacity: 0.3;\\n  right: 0;\\n  top: 0;\\n  -webkit-transform: translate(var(--translateX), var(--translateY));\\n          transform: translate(var(--translateX), var(--translateY));\\n  -webkit-transition-property: 'opacity';\\n  transition-property: 'opacity';\\n}\\n</style>\\n\";\n\n//# sourceURL=webpack://Cursor/./src/style.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	window.Cursor = __webpack_exports__;
/******/ 	
/******/ })()
;