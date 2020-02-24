"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_is_1 = require("react-is");
function ToolbarContainer(_a) {
    var toolbar = _a.toolbar, columns = _a.columns, rowsCount = _a.rowsCount, onToggleFilter = _a.onToggleFilter;
    if (!toolbar) {
        return null;
    }
    var toolBarProps = { columns: columns, onToggleFilter: onToggleFilter, rowsCount: rowsCount };
    if (react_is_1.isElement(toolbar)) {
        return react_1.default.cloneElement(toolbar, toolBarProps);
    }
    if (react_is_1.isValidElementType(toolbar)) {
        return react_1.default.createElement(toolbar, toolBarProps);
    }
    return null;
}
exports.default = ToolbarContainer;
//# sourceMappingURL=ToolbarContainer.js.map