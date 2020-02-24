"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
function CheckboxEditor(_a) {
    var value = _a.value, rowIdx = _a.rowIdx, column = _a.column, dependentValues = _a.dependentValues;
    function handleChange(event) {
        if (column.onCellChange) {
            column.onCellChange(rowIdx, column.key, dependentValues, event);
        }
    }
    return (react_1.default.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
        react_1.default.createElement("input", { type: "checkbox", className: "react-grid-checkbox", onChange: handleChange, checked: value === true }),
        react_1.default.createElement("span", { className: "react-grid-checkbox-label" })));
}
exports.default = CheckboxEditor;
//# sourceMappingURL=CheckboxEditor.js.map