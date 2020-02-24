import { __extends, __values } from "tslib";
import React from 'react';
import shallowEqual from 'shallowequal';
import HeaderCell from './HeaderCell';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './common/cells/headerCells/FilterableHeaderCell';
import getScrollbarSize from './getScrollbarSize';
import { isFrozen } from './ColumnUtils';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
var HeaderRow = /** @class */ (function (_super) {
    __extends(HeaderRow, _super);
    function HeaderRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cells = new Map();
        return _this;
    }
    HeaderRow.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.columns !== this.props.columns
            || !shallowEqual(nextProps.style, this.props.style)
            || this.props.sortColumn !== nextProps.sortColumn
            || this.props.sortDirection !== nextProps.sortDirection);
    };
    HeaderRow.prototype.getHeaderCellType = function (column) {
        if (column.filterable && this.props.filterable) {
            return HeaderCellType.FILTERABLE;
        }
        if (column.sortable && this.props.rowType !== HeaderRowType.FILTER) {
            return HeaderCellType.SORTABLE;
        }
        return HeaderCellType.NONE;
    };
    HeaderRow.prototype.getFilterableHeaderCell = function (column) {
        var FilterRenderer = column.filterRenderer || FilterableHeaderCell;
        return (React.createElement(FilterRenderer, { column: column, onChange: this.props.onFilterChange, getValidFilterValues: this.props.getValidFilterValues }));
    };
    HeaderRow.prototype.getSortableHeaderCell = function (column) {
        var sortDirection = this.props.sortColumn === column.key && this.props.sortDirection || DEFINE_SORT.NONE;
        var sortDescendingFirst = column.sortDescendingFirst || false;
        return (React.createElement(SortableHeaderCell, { column: column, rowType: this.props.rowType, onSort: this.props.onSort, sortDirection: sortDirection, sortDescendingFirst: sortDescendingFirst }));
    };
    HeaderRow.prototype.getHeaderRenderer = function (column) {
        if (column.headerRenderer && !column.sortable && !this.props.filterable) {
            return column.headerRenderer;
        }
        var headerCellType = this.getHeaderCellType(column);
        switch (headerCellType) {
            case HeaderCellType.SORTABLE:
                return this.getSortableHeaderCell(column);
            case HeaderCellType.FILTERABLE:
                return this.getFilterableHeaderCell(column);
            default:
                return undefined;
        }
    };
    HeaderRow.prototype.getCells = function () {
        var e_1, _a;
        var _this = this;
        var cells = [];
        var frozenCells = [];
        var _b = this.props, columns = _b.columns, rowType = _b.rowType;
        var _loop_1 = function (column) {
            var key = column.key;
            var renderer = key === 'select-row' && rowType === HeaderRowType.FILTER ? React.createElement("div", null) : this_1.getHeaderRenderer(column);
            var cell = (React.createElement(HeaderCell, { key: key, ref: function (node) { return node ? _this.cells.set(key, node) : _this.cells.delete(key); }, column: column, rowType: rowType, height: this_1.props.height, renderer: renderer, onResize: this_1.props.onColumnResize, onResizeEnd: this_1.props.onColumnResizeEnd, onHeaderDrop: this_1.props.onHeaderDrop, draggableHeaderCell: this_1.props.draggableHeaderCell }));
            if (isFrozen(column)) {
                frozenCells.push(cell);
            }
            else {
                cells.push(cell);
            }
        };
        var this_1 = this;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                _loop_1(column);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cells.concat(frozenCells);
    };
    HeaderRow.prototype.setScrollLeft = function (scrollLeft) {
        var _this = this;
        this.props.columns.forEach(function (column) {
            var key = column.key;
            if (!_this.cells.has(key))
                return;
            var cell = _this.cells.get(key);
            if (isFrozen(column)) {
                cell.setScrollLeft(scrollLeft);
            }
            else {
                cell.removeScroll();
            }
        });
    };
    HeaderRow.prototype.render = function () {
        var cellsStyle = {
            width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
            height: this.props.height
        };
        // FIXME: do we need 2 wrapping divs?
        return (React.createElement("div", { style: this.props.style, className: "react-grid-HeaderRow" },
            React.createElement("div", { style: cellsStyle }, this.getCells())));
    };
    HeaderRow.displayName = 'HeaderRow';
    return HeaderRow;
}(React.Component));
export default HeaderRow;
//# sourceMappingURL=HeaderRow.js.map