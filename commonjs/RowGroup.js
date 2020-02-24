"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = tslib_1.__importStar(require("react"));
var enums_1 = require("./common/enums");
var RowGroup = react_1.forwardRef(function RowGroup(props, ref) {
    function onRowExpandToggle(expand) {
        var onRowExpandToggle = props.cellMetaData.onRowExpandToggle;
        if (onRowExpandToggle) {
            var shouldExpand = expand == null ? !props.isExpanded : expand;
            onRowExpandToggle({ rowIdx: props.idx, shouldExpand: shouldExpand, columnGroupName: props.columnGroupName, name: props.name });
        }
    }
    function onRowExpandClick() {
        onRowExpandToggle(!props.isExpanded);
    }
    function onClick() {
        props.eventBus.dispatch(enums_1.EventTypes.SELECT_CELL, { rowIdx: props.idx, idx: 0 });
    }
    var lastColumn = props.columns[props.columns.length - 1];
    var style = { width: lastColumn.left + lastColumn.width };
    var Renderer = props.renderer || DefaultBase;
    return (react_1.default.createElement("div", { className: "react-grid-row-group", style: style, onClick: onClick },
        react_1.default.createElement(Renderer, tslib_1.__assign({}, props, { ref: ref, onRowExpandClick: onRowExpandClick, onRowExpandToggle: onRowExpandToggle }))));
});
exports.default = RowGroup;
var DefaultBase = react_1.forwardRef(function DefaultBase(props, ref) {
    function onKeyDown(_a) {
        var key = _a.key;
        var onRowExpandToggle = props.onRowExpandToggle;
        if (key === 'ArrowLeft') {
            onRowExpandToggle(false);
        }
        if (key === 'ArrowRight') {
            onRowExpandToggle(true);
        }
        if (key === 'Enter') {
            onRowExpandToggle(!props.isExpanded);
        }
    }
    var _a = props.treeDepth, treeDepth = _a === void 0 ? 0 : _a, height = props.height, onRowExpandClick = props.onRowExpandClick, isExpanded = props.isExpanded, columnGroupDisplayName = props.columnGroupDisplayName, name = props.name;
    var marginLeft = treeDepth * 20;
    return (react_1.default.createElement("div", { className: "rdg-row-group-default", style: { height: height }, onKeyDown: onKeyDown, tabIndex: 0, ref: ref },
        react_1.default.createElement("span", { className: "row-expand-icon", style: { marginLeft: marginLeft }, onClick: onRowExpandClick }, isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)),
        react_1.default.createElement("strong", null,
            columnGroupDisplayName,
            ": ",
            name)));
});
//# sourceMappingURL=RowGroup.js.map