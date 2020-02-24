"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CellMask_1 = tslib_1.__importDefault(require("./CellMask"));
function SelectionRangeMask(props) {
    return (react_1.default.createElement(CellMask_1.default, tslib_1.__assign({}, props, { className: "rdg-selected-range" })));
}
exports.default = SelectionRangeMask;
//# sourceMappingURL=SelectionRangeMask.js.map