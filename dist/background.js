/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chrome/background.ts":
/*!**********************************!*\
  !*** ./src/chrome/background.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dataFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dataFetcher */ "./src/lib/dataFetcher.ts");
/* harmony import */ var _lib_storageManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/storageManager */ "./src/lib/storageManager.ts");
/// <reference types="chrome" />
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// 初始化 Service Worker
chrome.runtime.onInstalled.addListener(() => {
    console.log('Form Auto Filler extension installed');
});
// 创建消息处理器
const messageHandler = {
    handleDataFetch(source) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataFetcher = _lib_dataFetcher__WEBPACK_IMPORTED_MODULE_0__.DataFetcher.getInstance();
                // const data = await dataFetcher.fetchFromApi(source.endpoint || '', source.authToken);
                const storageManager = _lib_storageManager__WEBPACK_IMPORTED_MODULE_1__.StorageManager.getInstance();
                yield storageManager.saveData({ lastUpdate: Date.now() });
                return { success: true, data: null };
            }
            catch (error) {
                console.error('Error fetching data:', error);
                return { success: false, error: String(error) };
            }
        });
    },
    handleFieldsDetected(data, tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageManager = _lib_storageManager__WEBPACK_IMPORTED_MODULE_1__.StorageManager.getInstance();
                yield storageManager.saveData({ mappings: data });
                if (tabId) {
                    chrome.tabs.sendMessage(tabId, { type: 'FIELDS_UPDATED', data });
                }
                return { success: true };
            }
            catch (error) {
                console.error('Error handling fields:', error);
                return { success: false, error: String(error) };
            }
        });
    }
};
// 设置消息监听器
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    const handleAsyncMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            switch (message.type) {
                case 'FETCH_DATA':
                    return yield messageHandler.handleDataFetch(message.source);
                case 'FIELDS_DETECTED':
                    return yield messageHandler.handleFieldsDetected(message.data, (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id);
                default:
                    return { success: false, error: 'Unknown message type' };
            }
        }
        catch (error) {
            console.error('Error handling message:', error);
            return { success: false, error: String(error) };
        }
    });
    // 处理异步消息
    handleAsyncMessage()
        .then(response => sendResponse(response))
        .catch(error => sendResponse({ success: false, error: String(error) }));
    return true; // 保持消息通道开放
});
// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.tabs.sendMessage(tabId, { type: 'TAB_UPDATED', url: tab.url })
            .catch(error => console.log('Tab not ready yet:', error));
    }
});


/***/ }),

/***/ "./src/lib/dataFetcher.ts":
/*!********************************!*\
  !*** ./src/lib/dataFetcher.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataFetcher: () => (/* binding */ DataFetcher)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.mjs");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// Import PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
    pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__.version}/pdf.worker.min.js`;
}
class DataFetcher {
    constructor() {
        this.cache = new Map();
    }
    static getInstance() {
        if (!DataFetcher.instance) {
            DataFetcher.instance = new DataFetcher();
        }
        return DataFetcher.instance;
    }
    fetchData(source) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (source.type) {
                case 'api':
                    return this.fetchFromApi(source.endpoint || '', source.authToken);
                case 'file':
                    if (source.fileData) {
                        return this.parseFile(source.fileData, source.mimeType || '');
                    }
                    throw new Error('No file data provided');
                case 'text':
                    if (source.content) {
                        return this.parseTextContent(source.content);
                    }
                    throw new Error('No text content provided');
                case 'pdf':
                    if (source.fileData) {
                        return this.parsePdfContent(source.fileData);
                    }
                    throw new Error('No PDF data provided');
                case 'storage':
                    if (source.content) {
                        return this.parseTextContent(source.content);
                    }
                    throw new Error('No storage data provided');
                default:
                    throw new Error('Unsupported data source type');
            }
        });
    }
    fetchFromApi(endpoint, authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
                const response = yield axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(endpoint, { headers });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching data from API:', error);
                throw error;
            }
        });
    }
    parseFile(fileData, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mimeType === 'application/json') {
                    const text = new TextDecoder().decode(fileData);
                    return JSON.parse(text);
                }
                else if (mimeType === 'text/csv') {
                    return this.parseCsvContent(new TextDecoder().decode(fileData));
                }
                else if (mimeType === 'application/pdf') {
                    return this.parsePdfContent(fileData);
                }
                throw new Error('Unsupported file type');
            }
            catch (error) {
                console.error('Error parsing file:', error);
                throw error;
            }
        });
    }
    parseTextContent(content) {
        try {
            // Try parsing as JSON first
            try {
                return JSON.parse(content);
            }
            catch (_a) {
                // If not JSON, try parsing as CSV
                return this.parseCsvContent(content);
            }
        }
        catch (error) {
            console.error('Error parsing text content:', error);
            throw error;
        }
    }
    parseCsvContent(content) {
        const lines = content.split('\n');
        if (lines.length < 2) {
            throw new Error('Invalid CSV format');
        }
        const headers = lines[0].split(',').map(h => h.trim());
        const values = lines[1].split(',').map(v => v.trim());
        const fields = headers.map((header, index) => ({
            id: `field-${index + 1}`,
            name: header,
            type: 'text',
            value: values[index] || ''
        }));
        return { fields };
    }
    parsePdfContent(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pdf = yield pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__.getDocument({ data: fileData }).promise;
                const page = yield pdf.getPage(1);
                const textContent = yield page.getTextContent();
                // Extract text content from PDF
                const text = textContent.items
                    .map((item) => item.str)
                    .join(' ');
                // Try to parse the text as structured data
                return this.parseTextContent(text);
            }
            catch (error) {
                console.error('Error parsing PDF:', error);
                throw error;
            }
        });
    }
    getData(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = source.type === 'api' ? source.endpoint : 'file';
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }
            let data;
            data = yield this.fetchData(source);
            this.cache.set(cacheKey, data);
            return data;
        });
    }
    clearCache() {
        this.cache.clear();
    }
}


/***/ }),

/***/ "./src/lib/storageManager.ts":
/*!***********************************!*\
  !*** ./src/lib/storageManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageManager: () => (/* binding */ StorageManager)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StorageManager {
    constructor() { }
    static getInstance() {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }
        return StorageManager.instance;
    }
    saveData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.local.set(data, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    getData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.local.get(key, (result) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    }
                    else {
                        resolve(result[key]);
                    }
                });
            });
        });
    }
    clearData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.local.clear(() => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"background": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkform_auto_filler"] = self["webpackChunkform_auto_filler"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/chrome/background.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map