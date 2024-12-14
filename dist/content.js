/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/content.css":
/*!********************************!*\
  !*** ./src/styles/content.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_content_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/content.css */ "./src/styles/content.css");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class FormFiller {
    constructor() {
        this.dialog = null;
        this.overlay = null;
        this.notification = null;
        this.pendingChanges = new Map();
        this.icon = null;
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeIcon());
        }
        else {
            this.initializeIcon();
        }
    }
    static getInstance() {
        if (!FormFiller.instance) {
            FormFiller.instance = new FormFiller();
        }
        return FormFiller.instance;
    }
    initializeIcon() {
        var _a;
        // Remove existing icon if any
        (_a = this.icon) === null || _a === void 0 ? void 0 : _a.remove();
        // Create new icon
        this.icon = document.createElement('div');
        this.icon.className = 'form-filler-icon';
        this.icon.innerHTML = '✏️';
        this.icon.title = '点击打开表单填充器';
        this.icon.addEventListener('click', () => this.showDialog());
        // Add to document
        document.body.appendChild(this.icon);
        // Ensure icon stays on top
        this.observeBodyChanges();
    }
    observeBodyChanges() {
        const observer = new MutationObserver(() => {
            if (!document.body.contains(this.icon) && this.icon) {
                document.body.appendChild(this.icon);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    showDialog() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'form-filler-overlay';
        this.overlay.addEventListener('click', () => this.hideDialog());
        // Create dialog
        this.dialog = document.createElement('div');
        this.dialog.className = 'form-filler-dialog';
        this.dialog.addEventListener('click', (e) => e.stopPropagation());
        // Create content
        const title = document.createElement('h3');
        title.textContent = '表单填充器';
        title.style.margin = '0 0 15px 0';
        const input = document.createElement('textarea');
        input.className = 'form-filler-input';
        input.placeholder = '输入要填充的文本内容...\n例如：\n姓名: 张三\n年龄: 25';
        input.rows = 5;
        const fillButton = document.createElement('button');
        fillButton.className = 'form-filler-button';
        fillButton.textContent = '填充表单';
        fillButton.addEventListener('click', () => this.handleFill(input.value));
        const cancelButton = document.createElement('button');
        cancelButton.className = 'form-filler-button secondary';
        cancelButton.textContent = '取消';
        cancelButton.addEventListener('click', () => this.hideDialog());
        const closeButton = document.createElement('span');
        closeButton.className = 'form-filler-close';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', () => this.hideDialog());
        // Assemble dialog
        this.dialog.appendChild(closeButton);
        this.dialog.appendChild(title);
        this.dialog.appendChild(input);
        this.dialog.appendChild(document.createElement('br'));
        this.dialog.appendChild(fillButton);
        this.dialog.appendChild(cancelButton);
        // Add to document
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.dialog);
        // Focus input
        input.focus();
    }
    hideDialog() {
        var _a, _b;
        (_a = this.overlay) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this.dialog) === null || _b === void 0 ? void 0 : _b.remove();
        this.overlay = null;
        this.dialog = null;
    }
    handleFill(content) {
        this.hideDialog();
        const fields = this.findFormFields();
        // Try to match content with form fields
        fields.forEach(field => {
            const value = this.findMatchingValue(field.element, content);
            if (value && value !== field.element.value) {
                this.pendingChanges.set(field.element, {
                    element: field.element,
                    value,
                    originalValue: field.element.value
                });
            }
        });
        if (this.pendingChanges.size > 0) {
            this.showNotification();
        }
    }
    findFormFields() {
        const fields = [];
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                fields.push({
                    element: input,
                    value: input.value,
                    originalValue: input.value
                });
            }
        });
        return fields;
    }
    findMatchingValue(element, content) {
        var _a;
        // Try to find a line that matches the field's label or placeholder
        const label = this.findFieldLabel(element);
        if (!label)
            return null;
        const lines = content.split('\n');
        for (const line of lines) {
            if (line.toLowerCase().includes(label.toLowerCase())) {
                const value = (_a = line.split(':')[1]) === null || _a === void 0 ? void 0 : _a.trim();
                if (value)
                    return value;
            }
        }
        return null;
    }
    findFieldLabel(element) {
        var _a, _b;
        // Try to find label by for attribute
        const id = element.getAttribute('id');
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label)
                return ((_a = label.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || null;
        }
        // Try to find label by proximity
        const parent = element.parentElement;
        if (parent) {
            const label = parent.querySelector('label');
            if (label)
                return ((_b = label.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || null;
        }
        // Try placeholder or aria-label
        return element.getAttribute('placeholder') ||
            element.getAttribute('aria-label') ||
            null;
    }
    showNotification() {
        // Create notification
        this.notification = document.createElement('div');
        this.notification.className = 'form-filler-notification';
        const title = document.createElement('h4');
        title.textContent = '发现可填充的内容';
        title.style.margin = '0 0 10px 0';
        const message = document.createElement('div');
        message.textContent = `找到 ${this.pendingChanges.size} 个可以填充的字段。`;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'form-filler-notification-buttons';
        const acceptButton = document.createElement('button');
        acceptButton.className = 'form-filler-button';
        acceptButton.textContent = '接受';
        acceptButton.addEventListener('click', () => this.applyChanges());
        const rejectButton = document.createElement('button');
        rejectButton.className = 'form-filler-button secondary';
        rejectButton.textContent = '放弃';
        rejectButton.addEventListener('click', () => this.hideNotification());
        buttonContainer.appendChild(acceptButton);
        buttonContainer.appendChild(rejectButton);
        this.notification.appendChild(title);
        this.notification.appendChild(message);
        this.notification.appendChild(buttonContainer);
        document.body.appendChild(this.notification);
    }
    hideNotification() {
        var _a;
        (_a = this.notification) === null || _a === void 0 ? void 0 : _a.remove();
        this.notification = null;
        this.pendingChanges.clear();
    }
    applyChanges() {
        this.pendingChanges.forEach(field => {
            field.element.value = field.value;
            field.element.dispatchEvent(new Event('input', { bubbles: true }));
            field.element.dispatchEvent(new Event('change', { bubbles: true }));
        });
        this.hideNotification();
    }
}
// Initialize form filler
const formFiller = FormFiller.getInstance();
// Re-initialize when content script is injected
if (document.readyState === 'complete') {
    formFiller.initializeIcon();
}
// 监听来自扩展的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TAB_UPDATED') {
        // 检查是否是腾讯问卷页面
        if (window.location.href.includes('wj.qq.com')) {
            // 等待表单加载完成
            waitForForm().then(() => {
                console.log('Form detected on page');
                // 通知扩展表单已准备就绪
                chrome.runtime.sendMessage({
                    type: 'FORM_READY',
                    url: window.location.href
                });
            });
        }
    }
    else if (message.type === 'FILL_FORM') {
        fillForm(message.data);
    }
});
// 等待表单元素加载
function waitForForm() {
    return new Promise((resolve) => {
        const checkForm = () => {
            const form = document.querySelector('.question-wrapper');
            if (form) {
                resolve();
            }
            else {
                setTimeout(checkForm, 500);
            }
        };
        checkForm();
    });
}
// 填写表单
function fillForm(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 等待表单加载
            yield waitForForm();
            // 获取所有问题容器
            const questions = document.querySelectorAll('.question-wrapper');
            questions.forEach((question) => {
                var _a;
                // 获取问题标题
                const titleElement = question.querySelector('.question-title');
                if (!titleElement)
                    return;
                const title = ((_a = titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                if (!title || !formData[title])
                    return;
                const value = formData[title];
                // 处理不同类型的问题
                // 单选题
                const radioInputs = question.querySelectorAll('input[type="radio"]');
                if (radioInputs.length > 0) {
                    radioInputs.forEach((radio) => {
                        var _a, _b;
                        if (radio instanceof HTMLInputElement) {
                            const label = (_b = (_a = radio.parentElement) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                            if (label === value) {
                                radio.click();
                            }
                        }
                    });
                    return;
                }
                // 文本输入
                const textInput = question.querySelector('input[type="text"], textarea');
                if (textInput instanceof HTMLInputElement || textInput instanceof HTMLTextAreaElement) {
                    textInput.value = value;
                    textInput.dispatchEvent(new Event('input', { bubbles: true }));
                    textInput.dispatchEvent(new Event('change', { bubbles: true }));
                    return;
                }
                // 多选题
                const checkboxInputs = question.querySelectorAll('input[type="checkbox"]');
                if (checkboxInputs.length > 0) {
                    const values = value.split(',').map(v => v.trim());
                    checkboxInputs.forEach((checkbox) => {
                        var _a, _b;
                        if (checkbox instanceof HTMLInputElement) {
                            const label = (_b = (_a = checkbox.parentElement) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                            if (label && values.includes(label)) {
                                checkbox.click();
                            }
                        }
                    });
                    return;
                }
                // 下拉选择
                const select = question.querySelector('select');
                if (select instanceof HTMLSelectElement) {
                    const options = Array.from(select.options);
                    const option = options.find(opt => opt.text.trim() === value);
                    if (option) {
                        select.value = option.value;
                        select.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    return;
                }
            });
            console.log('Form filled successfully');
        }
        catch (error) {
            console.error('Error filling form:', error);
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=content.js.map