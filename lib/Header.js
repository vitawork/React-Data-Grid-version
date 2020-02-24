import { __assign, __extends } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import HeaderRow from './HeaderRow';
import { resizeColumn } from './ColumnMetrics';
import getScrollbarSize from './getScrollbarSize';
import { HeaderRowType } from './common/enums';
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { resizing: null };
        _this.row = React.createRef();
        _this.filterRow = React.createRef();
        _this.onColumnResize = function (column, width) {
            var pos = _this.getColumnPosition(column);
            if (pos === null)
                return;
            var prevColumnMetrics = _this.state.resizing ? _this.state.resizing.columnMetrics : _this.props.columnMetrics;
            var columnMetrics = resizeColumn(__assign({}, prevColumnMetrics), pos, width);
            // we don't want to influence scrollLeft while resizing
            if (columnMetrics.totalWidth < prevColumnMetrics.totalWidth) {
                columnMetrics.totalWidth = prevColumnMetrics.totalWidth;
            }
            _this.setState({
                resizing: {
                    column: columnMetrics.columns[pos],
                    columnMetrics: columnMetrics
                }
            });
        };
        _this.onColumnResizeEnd = function (column, width) {
            var pos = _this.getColumnPosition(column);
            if (pos === null)
                return;
            _this.props.onColumnResize(pos, width || column.width);
        };
        // Set the cell selection to -1 x -1 when clicking on the header
        _this.onHeaderClick = function () {
            _this.props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
        };
        return _this;
    }
    Header.prototype.componentWillReceiveProps = function () {
        this.setState({ resizing: null });
    };
    Header.prototype.getHeaderRows = function () {
        var _this = this;
        var columnMetrics = this.getColumnMetrics();
        return this.props.headerRows.map(function (row, index) {
            // To allow header filters to be visible
            var isFilterRow = row.rowType === HeaderRowType.FILTER;
            var rowHeight = isFilterRow ? '500px' : 'auto';
            var scrollbarSize = getScrollbarSize() > 0 ? getScrollbarSize() : 0;
            var updatedWidth = typeof _this.props.totalWidth === 'number'
                ? _this.props.totalWidth - scrollbarSize
                : _this.props.totalWidth;
            var headerRowStyle = {
                top: _this.getCombinedHeaderHeights(index),
                width: updatedWidth,
                minHeight: rowHeight
            };
            return (React.createElement(HeaderRow, { key: row.rowType, ref: isFilterRow ? _this.filterRow : _this.row, rowType: row.rowType, style: headerRowStyle, onColumnResize: _this.onColumnResize, onColumnResizeEnd: _this.onColumnResizeEnd, width: columnMetrics.width, height: row.height || _this.props.rowHeight, columns: columnMetrics.columns, draggableHeaderCell: _this.props.draggableHeaderCell, filterable: row.filterable, onFilterChange: row.onFilterChange, onHeaderDrop: _this.props.onHeaderDrop, sortColumn: _this.props.sortColumn, sortDirection: _this.props.sortDirection, onSort: _this.props.onSort, getValidFilterValues: _this.props.getValidFilterValues }));
        });
    };
    Header.prototype.getColumnMetrics = function () {
        if (this.state.resizing) {
            return this.state.resizing.columnMetrics;
        }
        return this.props.columnMetrics;
    };
    Header.prototype.getColumnPosition = function (column) {
        var columns = this.getColumnMetrics().columns;
        var idx = columns.findIndex(function (c) { return c.key === column.key; });
        return idx === -1 ? null : idx;
    };
    Header.prototype.getCombinedHeaderHeights = function (until) {
        var stopAt = typeof until === 'number'
            ? until
            : this.props.headerRows.length;
        var height = 0;
        for (var index = 0; index < stopAt; index++) {
            height += this.props.headerRows[index].height || this.props.rowHeight;
        }
        return height;
    };
    Header.prototype.setScrollLeft = function (scrollLeft) {
        var node = ReactDOM.findDOMNode(this.row.current);
        node.scrollLeft = scrollLeft;
        this.row.current.setScrollLeft(scrollLeft);
        if (this.filterRow.current) {
            var nodeFilters = ReactDOM.findDOMNode(this.filterRow.current);
            nodeFilters.scrollLeft = scrollLeft;
            this.filterRow.current.setScrollLeft(scrollLeft);
        }
    };
    Header.prototype.render = function () {
        var className = classNames('react-grid-Header', {
            'react-grid-Header--resizing': !!this.state.resizing
        });
        return (React.createElement("div", { style: { height: this.getCombinedHeaderHeights() }, className: className, onClick: this.onHeaderClick }, this.getHeaderRows()));
    };
    return Header;
}(React.Component));
export default Header;
//# sourceMappingURL=Header.js.map