"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
function DragHandle(_a) {
    var onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, onDoubleClick = _a.onDoubleClick;
    return (react_1.default.createElement("div", { className: "drag-handle", draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, onDoubleClick: onDoubleClick }));
}
exports.default = DragHandle;
//# sourceMappingURL=DragHandle.js.map