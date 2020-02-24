"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var enums_1 = require("../common/enums");
function CellExpander(_a) {
    var expanded = _a.expanded, onCellExpand = _a.onCellExpand;
    function handleCellExpand(e) {
        e.stopPropagation();
        onCellExpand();
    }
    return (react_1.default.createElement("div", { className: "rdg-cell-expand" },
        react_1.default.createElement("span", { onClick: handleCellExpand }, expanded ? enums_1.CellExpand.DOWN_TRIANGLE : enums_1.CellExpand.RIGHT_TRIANGLE)));
}
exports.default = CellExpander;
//# sourceMappingURL=CellExpander.js.map