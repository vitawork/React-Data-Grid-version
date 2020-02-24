import React from 'react';
export default function ChildRowDeleteButton(_a) {
    var treeDepth = _a.treeDepth, cellHeight = _a.cellHeight, onDeleteSubRow = _a.onDeleteSubRow, isDeleteSubRowEnabled = _a.isDeleteSubRowEnabled;
    var left = treeDepth * 15;
    var top = (cellHeight - 12) / 2;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rdg-child-row-action-cross" }),
        isDeleteSubRowEnabled && (React.createElement("div", { style: { left: left, top: top }, className: "rdg-child-row-btn", onClick: onDeleteSubRow },
            React.createElement("div", { className: "glyphicon glyphicon-remove-sign" })))));
}
//# sourceMappingURL=ChildRowDeleteButton.js.map