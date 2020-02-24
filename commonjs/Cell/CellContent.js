"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ChildRowDeleteButton_1 = tslib_1.__importDefault(require("../ChildRowDeleteButton"));
var CellValue_1 = tslib_1.__importDefault(require("./CellValue"));
function CellContent(_a) {
    var idx = _a.idx, tooltip = _a.tooltip, expandableOptions = _a.expandableOptions, height = _a.height, cellMetaData = _a.cellMetaData, cellControls = _a.cellControls, props = tslib_1.__rest(_a, ["idx", "tooltip", "expandableOptions", "height", "cellMetaData", "cellControls"]);
    var column = props.column;
    var isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
    var treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
    var marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;
    function handleDeleteSubRow() {
        if (cellMetaData.onDeleteSubRow) {
            cellMetaData.onDeleteSubRow({
                idx: idx,
                rowIdx: props.rowIdx,
                rowData: props.rowData,
                expandArgs: expandableOptions
            });
        }
    }
    var cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (react_1.default.createElement(ChildRowDeleteButton_1.default, { treeDepth: treeDepth, cellHeight: height, onDeleteSubRow: handleDeleteSubRow, isDeleteSubRowEnabled: !!cellMetaData.onDeleteSubRow }));
    var classes = classnames_1.default('react-grid-Cell__value', { 'cell-tooltip': !!tooltip });
    return (react_1.default.createElement("div", { className: classes },
        cellDeleter,
        react_1.default.createElement("div", { className: "react-grid-Cell__container", style: { marginLeft: marginLeft } },
            react_1.default.createElement("span", null,
                react_1.default.createElement(CellValue_1.default, tslib_1.__assign({}, props))),
            cellControls),
        tooltip && react_1.default.createElement("span", { className: "cell-tooltip-text" }, tooltip)));
}
exports.default = CellContent;
//# sourceMappingURL=CellContent.js.map