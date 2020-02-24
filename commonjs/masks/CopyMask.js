"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CellMask_1 = tslib_1.__importDefault(require("./CellMask"));
var CopyMask = react_1.forwardRef(function CopyMask(props, ref) {
    return (react_1.default.createElement(CellMask_1.default, tslib_1.__assign({}, props, { className: "react-grid-cell-copied", ref: ref })));
});
exports.default = CopyMask;
//# sourceMappingURL=CopyMask.js.map