/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/popup/ActionPanel.tsx":
/*!**********************************************!*\
  !*** ./src/components/popup/ActionPanel.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionPanel: () => (/* binding */ ActionPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material */ "./node_modules/@mui/icons-material/esm/AutoFixHigh.js");
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material */ "./node_modules/@mui/icons-material/esm/Refresh.js");



const ActionPanel = ({ onFill, onRefresh, disabled = false }) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], { sx: { display: 'flex', gap: 1 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], { variant: "contained", startIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__["default"], {}), onClick: onFill, disabled: disabled, fullWidth: true, children: "Auto Fill" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], { variant: "outlined", startIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__["default"], {}), onClick: onRefresh, disabled: disabled, children: "Refresh" })] }));
};


/***/ }),

/***/ "./src/components/popup/DataPreview.tsx":
/*!**********************************************!*\
  !*** ./src/components/popup/DataPreview.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataPreview: () => (/* binding */ DataPreview),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Paper/Paper.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TableContainer/TableContainer.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Table/Table.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TableHead/TableHead.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TableRow/TableRow.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TableCell/TableCell.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TableBody/TableBody.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");


const DataPreview = ({ data }) => {
    if (!data.fields || data.fields.length === 0) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], { sx: { p: 2, mb: 2 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], { children: "No form data available" }) }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], { sx: { mb: 2 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], { size: "small", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: "Field Name" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: "Type" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: "Value" })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], { children: data.fields.map((field, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: field.name || field.label || 'Unnamed Field' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: field.type }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { children: field.type === 'select' && field.options ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], { component: "span", sx: { color: 'text.secondary' }, children: [field.value, " (Options: ", field.options.join(', '), ")"] })) : (field.value || (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], { component: "span", sx: { color: 'text.disabled' }, children: "Empty" })) })] }, field.id || index))) })] }) }) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataPreview);


/***/ }),

/***/ "./src/components/popup/DataSourceInput.tsx":
/*!**************************************************!*\
  !*** ./src/components/popup/DataSourceInput.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataSourceInput: () => (/* binding */ DataSourceInput),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Paper/Paper.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/InputLabel/InputLabel.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");



const DataSourceInput = ({ onSubmit }) => {
    var _a, _b;
    const [sourceType, setSourceType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('api');
    const [apiEndpoint, setApiEndpoint] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [apiKey, setApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [textContent, setTextContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleSubmit = (e) => {
        var _a, _b;
        e.preventDefault();
        if (sourceType === 'api') {
            onSubmit({
                type: 'api',
                endpoint: apiEndpoint,
                authToken: apiKey,
            });
        }
        else if (sourceType === 'text') {
            onSubmit({
                type: 'text',
                content: textContent,
            });
        }
        else if ((_b = (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0]) {
            const file = fileInputRef.current.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) instanceof ArrayBuffer) {
                    onSubmit({
                        type: file.type.includes('pdf') ? 'pdf' : 'file',
                        fileName: file.name,
                        fileData: e.target.result,
                        mimeType: file.type,
                    });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], { sx: { p: 2, mb: 2 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", { onSubmit: handleSubmit, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], { fullWidth: true, sx: { mb: 2 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], { children: "Data Source Type" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], { value: sourceType, label: "Data Source Type", onChange: (e) => setSourceType(e.target.value), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { value: "api", children: "API" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { value: "file", children: "File Upload" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { value: "text", children: "Text Input" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], { value: "pdf", children: "PDF Document" })] })] }), sourceType === 'api' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { fullWidth: true, label: "API Endpoint", value: apiEndpoint, onChange: (e) => setApiEndpoint(e.target.value), sx: { mb: 2 }, required: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { fullWidth: true, label: "API Key (Optional)", value: apiKey, onChange: (e) => setApiKey(e.target.value), type: "password", sx: { mb: 2 } })] })) : sourceType === 'text' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { fullWidth: true, label: "Data Content", value: textContent, onChange: (e) => setTextContent(e.target.value), multiline: true, rows: 4, sx: { mb: 2 }, required: true })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], { sx: { mb: 2 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: "file", ref: fileInputRef, accept: sourceType === 'pdf' ? '.pdf' : '.json,.csv', style: { display: 'none' }, onChange: (e) => {
                                var _a;
                                const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        var _a;
                                        if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) instanceof ArrayBuffer) {
                                            onSubmit({
                                                type: file.type.includes('pdf') ? 'pdf' : 'file',
                                                fileName: file.name,
                                                fileData: e.target.result,
                                                mimeType: file.type,
                                            });
                                        }
                                    };
                                    reader.readAsArrayBuffer(file);
                                }
                            } }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], { variant: "outlined", onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, fullWidth: true, children: ["Choose ", sourceType === 'pdf' ? 'PDF' : 'File'] }), ((_b = (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0]) && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], { variant: "body2", sx: { mt: 1 }, children: ["Selected file: ", fileInputRef.current.files[0].name] }))] })), (sourceType === 'api' || sourceType === 'text') && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], { type: "submit", variant: "contained", color: "primary", fullWidth: true, children: "Submit" }))] }) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceInput);


/***/ }),

/***/ "./src/components/popup/PopupApp.tsx":
/*!*******************************************!*\
  !*** ./src/components/popup/PopupApp.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/createTheme.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/ThemeProvider.js");
/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/CssBaseline */ "./node_modules/@mui/material/CssBaseline/CssBaseline.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Container/Container.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Alert/Alert.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CircularProgress/CircularProgress.js");
/* harmony import */ var _DataSourceInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataSourceInput */ "./src/components/popup/DataSourceInput.tsx");
/* harmony import */ var _ActionPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActionPanel */ "./src/components/popup/ActionPanel.tsx");
/* harmony import */ var _StatusPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StatusPanel */ "./src/components/popup/StatusPanel.tsx");
/* harmony import */ var _DataPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataPreview */ "./src/components/popup/DataPreview.tsx");
/* harmony import */ var _lib_storageManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/storageManager */ "./src/lib/storageManager.ts");
/* harmony import */ var _lib_dataFetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/dataFetcher */ "./src/lib/dataFetcher.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_8__["default"])({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
});
const PopupApp = () => {
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        loading: false,
        error: null,
        data: null,
        dataSource: null,
        lastUpdate: null,
    });
    const handleDataSourceSubmit = (source) => __awaiter(void 0, void 0, void 0, function* () {
        setState(prev => (Object.assign(Object.assign({}, prev), { loading: true, error: null })));
        try {
            const data = yield _lib_dataFetcher__WEBPACK_IMPORTED_MODULE_7__.DataFetcher.getInstance().fetchData(source);
            setState(prev => (Object.assign(Object.assign({}, prev), { loading: false, data, dataSource: source, lastUpdate: new Date() })));
            yield _lib_storageManager__WEBPACK_IMPORTED_MODULE_6__.StorageManager.getInstance().saveData({
                dataSource: source,
                lastUpdate: Date.now(),
                formData: data,
                settings: {
                    autoFill: true,
                    fillDelay: 500,
                },
                mappings: [],
            });
        }
        catch (error) {
            setState(prev => (Object.assign(Object.assign({}, prev), { loading: false, error: error instanceof Error ? error.message : 'Unknown error occurred' })));
        }
    });
    const handleFillForm = () => __awaiter(void 0, void 0, void 0, function* () {
        setState(prev => (Object.assign(Object.assign({}, prev), { loading: true })));
        try {
            // Send message to content script
            const [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.id && state.data) {
                yield chrome.tabs.sendMessage(tab.id, {
                    type: 'FILL_FORM',
                    data: state.data.fields
                });
            }
        }
        catch (error) {
            setState(prev => (Object.assign(Object.assign({}, prev), { error: error instanceof Error ? error.message : 'Failed to fill form' })));
        }
        finally {
            setState(prev => (Object.assign(Object.assign({}, prev), { loading: false })));
        }
    });
    const handleRefresh = () => __awaiter(void 0, void 0, void 0, function* () {
        if (state.dataSource) {
            yield handleDataSourceSubmit(state.dataSource);
        }
    });
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__["default"], { theme: theme, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_10__["default"], {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], { maxWidth: "sm", sx: { p: 2 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], { sx: { mb: 2 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", { children: "Form Auto Filler" }) }), state.error && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], { severity: "error", sx: { mb: 2 }, children: state.error })), state.loading ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], { sx: { display: 'flex', justifyContent: 'center', p: 3 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {}) })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DataSourceInput__WEBPACK_IMPORTED_MODULE_2__.DataSourceInput, { onSubmit: handleDataSourceSubmit }), state.data && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DataPreview__WEBPACK_IMPORTED_MODULE_5__.DataPreview, { data: state.data }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ActionPanel__WEBPACK_IMPORTED_MODULE_3__.ActionPanel, { onFill: handleFillForm, onRefresh: handleRefresh, disabled: state.loading })] })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StatusPanel__WEBPACK_IMPORTED_MODULE_4__.StatusPanel, { loading: state.loading, lastUpdate: state.lastUpdate, dataSource: state.dataSource })] }))] })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupApp);


/***/ }),

/***/ "./src/components/popup/StatusPanel.tsx":
/*!**********************************************!*\
  !*** ./src/components/popup/StatusPanel.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusPanel: () => (/* binding */ StatusPanel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/CircularProgress/CircularProgress.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");


const StatusPanel = ({ loading, lastUpdate, dataSource, }) => {
    const getDataSourceDescription = (source) => {
        switch (source.type) {
            case 'api':
                return `API: ${source.endpoint}`;
            case 'file':
                return `File: ${source.fileName}`;
            case 'text':
                return 'Text Input';
            case 'pdf':
                return `PDF: ${source.fileName}`;
            default:
                return 'Unknown Source';
        }
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], { sx: { mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }, children: loading ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__["default"], { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], { size: 20 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], { variant: "body2", children: "Loading..." })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [dataSource && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], { variant: "body2", gutterBottom: true, children: ["Source: ", getDataSourceDescription(dataSource)] })), lastUpdate && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], { variant: "body2", color: "text.secondary", children: ["Last updated: ", lastUpdate.toLocaleString()] }))] })) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusPanel);


/***/ }),

/***/ "./src/components/popup/index.tsx":
/*!****************************************!*\
  !*** ./src/components/popup/index.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _PopupApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopupApp */ "./src/components/popup/PopupApp.tsx");




const container = document.getElementById('root');
if (container) {
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_2__.createRoot)(container);
    root.render((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((react__WEBPACK_IMPORTED_MODULE_1___default().StrictMode), { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PopupApp__WEBPACK_IMPORTED_MODULE_3__["default"], {}) }));
}


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
/******/ 			"popup": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/components/popup/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map