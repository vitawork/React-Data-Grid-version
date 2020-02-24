import { __assign, __extends, __values } from "tslib";
import React from 'react';
import classNames from 'classnames';
import rowComparer from './common/utils/RowComparer';
import Cell from './Cell';
import { isFrozen } from './ColumnUtils';
import * as rowUtils from './RowUtils';
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.row = React.createRef();
        _this.cells = new Map();
        _this.handleDragEnter = function (e) {
            // Prevent default to allow drop
            e.preventDefault();
            var _a = _this.props, idx = _a.idx, cellMetaData = _a.cellMetaData;
            cellMetaData.onDragEnter(idx);
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };
        _this.handleDrop = function (e) {
            // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
            // To bypass this, we need to capture and prevent the drop event.
            e.preventDefault();
        };
        return _this;
    }
    Row.prototype.shouldComponentUpdate = function (nextProps) {
        return rowComparer(nextProps, this.props);
    };
    Row.prototype.getCell = function (column) {
        var _this = this;
        var Renderer = this.props.cellRenderer;
        var _a = this.props, idx = _a.idx, cellMetaData = _a.cellMetaData, isScrolling = _a.isScrolling, row = _a.row, isSelected = _a.isSelected, scrollLeft = _a.scrollLeft, lastFrozenColumnIndex = _a.lastFrozenColumnIndex;
        var key = column.key;
        var cellProps = {
            ref: function (cell) { return cell ? _this.cells.set(key, cell) : _this.cells.delete(key); },
            idx: column.idx,
            rowIdx: idx,
            height: this.getRowHeight(),
            column: column,
            cellMetaData: cellMetaData,
            value: this.getCellValue(key || String(column.idx)),
            rowData: row,
            isRowSelected: isSelected,
            expandableOptions: this.getExpandableOptions(key),
            isScrolling: isScrolling,
            scrollLeft: scrollLeft,
            lastFrozenColumnIndex: lastFrozenColumnIndex
        };
        return React.createElement(Renderer, __assign({ key: key + "-" + idx }, cellProps)); // FIXME: fix key type
    };
    Row.prototype.getCells = function () {
        var _this = this;
        var _a = this.props, colOverscanStartIdx = _a.colOverscanStartIdx, colOverscanEndIdx = _a.colOverscanEndIdx, columns = _a.columns;
        var frozenColumns = columns.filter(function (c) { return isFrozen(c); });
        var nonFrozenColumn = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(function (c) { return !isFrozen(c); });
        return nonFrozenColumn.concat(frozenColumns).map(function (c) { return _this.getCell(c); });
    };
    Row.prototype.getRowTop = function () {
        var current = this.row.current;
        return current ? current.offsetTop : 0;
    };
    Row.prototype.getRowHeight = function () {
        return this.props.height;
    };
    Row.prototype.getCellValue = function (key) {
        var _a = this.props, isSelected = _a.isSelected, row = _a.row;
        if (key === 'select-row') {
            return isSelected;
        }
        return rowUtils.get(row, key);
    };
    Row.prototype.getExpandableOptions = function (columnKey) {
        var subRowDetails = this.props.subRowDetails;
        if (!subRowDetails)
            return;
        var field = subRowDetails.field, expanded = subRowDetails.expanded, children = subRowDetails.children, treeDepth = subRowDetails.treeDepth;
        return {
            canExpand: field === columnKey && ((children && children.length > 0) || subRowDetails.group === true),
            field: field,
            expanded: expanded,
            children: children,
            treeDepth: treeDepth,
            subRowDetails: subRowDetails
        };
    };
    Row.prototype.setScrollLeft = function (scrollLeft) {
        var e_1, _a;
        try {
            for (var _b = __values(this.props.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var column = _c.value;
                var key = column.key;
                if (isFrozen(column) && this.cells.has(key)) {
                    this.cells.get(key).setScrollLeft(scrollLeft);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Row.prototype.render = function () {
        var className = classNames('react-grid-Row', "react-grid-Row--" + (this.props.idx % 2 === 0 ? 'even' : 'odd'), { 'row-selected': this.props.isSelected }, this.props.extraClasses, { 'rdg-scrolling': this.props.isScrolling });
        return (React.createElement("div", { ref: this.row, className: className, style: { height: this.getRowHeight() }, onDragEnter: this.handleDragEnter, onDragOver: this.handleDragOver, onDrop: this.handleDrop }, this.getCells()));
    };
    Row.displayName = 'Row';
    Row.defaultProps = {
        cellRenderer: Cell,
        isSelected: false,
        height: 35
    };
    return Row;
}(React.Component));
export default Row;
//# sourceMappingURL=Row.js.map