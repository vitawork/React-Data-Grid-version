"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
function ChildRowDeleteButton(_a) {
    var treeDepth = _a.treeDepth, cellHeight = _a.cellHeight, onDeleteSubRow = _a.onDeleteSubRow, isDeleteSubRowEnabled = _a.isDeleteSubRowEnabled;
    var left = treeDepth * 15;
    var top = (cellHeight - 12) / 2;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "rdg-child-row-action-cross" }),
        isDeleteSubRowEnabled && (react_1.default.createElement("div", { style: { left: left, top: top }, className: "rdg-child-row-btn", onClick: onDeleteSubRow },
            react_1.default.createElement("div", { className: "glyphicon glyphicon-remove-sign" })))));
}
exports.default = ChildRowDeleteButton;
//# sourceMappingURL=ChildRowDeleteButton.js.map