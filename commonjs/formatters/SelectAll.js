"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
exports.SelectAll = react_1.forwardRef(function SelectAll(_a, ref) {
    var onChange = _a.onChange;
    return (react_1.default.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
        react_1.default.createElement("input", { type: "checkbox", className: "react-grid-checkbox", ref: ref, onChange: onChange }),
        react_1.default.createElement("span", { className: "react-grid-checkbox-label" })));
});
//# sourceMappingURL=SelectAll.js.map