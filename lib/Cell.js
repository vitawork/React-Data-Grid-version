import { __assign, __extends } from "tslib";
import React from 'react';
import classNames from 'classnames';
import CellActions from './Cell/CellActions';
import CellExpand from './Cell/CellExpander';
import CellContent from './Cell/CellContent';
import { isFrozen } from './ColumnUtils';
function getSubRowOptions(_a) {
    var rowIdx = _a.rowIdx, idx = _a.idx, rowData = _a.rowData, expandArgs = _a.expandableOptions;
    return { rowIdx: rowIdx, idx: idx, rowData: rowData, expandArgs: expandArgs };
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cell = React.createRef();
        _this.handleCellClick = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellClick({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellMouseDown = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            if (cellMetaData.onCellMouseDown) {
                cellMetaData.onCellMouseDown({ idx: idx, rowIdx: rowIdx });
            }
        };
        _this.handleCellMouseEnter = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            if (cellMetaData.onCellMouseEnter) {
                cellMetaData.onCellMouseEnter({ idx: idx, rowIdx: rowIdx });
            }
        };
        _this.handleCellContextMenu = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellContextMenu({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellDoubleClick = function (e) {
            e.stopPropagation();
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellDoubleClick({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellExpand = function () {
            var onCellExpand = _this.props.cellMetaData.onCellExpand;
            if (onCellExpand) {
                onCellExpand(getSubRowOptions(_this.props));
            }
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
        };
        return _this;
    }
    Cell.prototype.componentDidMount = function () {
        this.checkScroll();
    };
    Cell.prototype.componentDidUpdate = function (prevProps) {
        if (isFrozen(prevProps.column) && !isFrozen(this.props.column)) {
            this.removeScroll();
        }
    };
    Cell.prototype.getStyle = function () {
        return {
            width: this.props.column.width,
            height: this.props.height,
            left: this.props.column.left
        };
    };
    Cell.prototype.getCellClass = function () {
        var _a = this.props, idx = _a.idx, column = _a.column, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, isRowSelected = _a.isRowSelected, tooltip = _a.tooltip, expandableOptions = _a.expandableOptions;
        return classNames(column.cellClass, 'react-grid-Cell', this.props.className, {
            'react-grid-Cell--frozen': isFrozen(column),
            'rdg-last--frozen': lastFrozenColumnIndex === idx,
            'row-selected': isRowSelected,
            'has-tooltip': !!tooltip,
            'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
        });
    };
    Cell.prototype.checkScroll = function () {
        var _a = this.props, scrollLeft = _a.scrollLeft, column = _a.column;
        var node = this.cell.current;
        if (isFrozen(column) && node && node.style.transform != null) {
            this.setScrollLeft(scrollLeft);
        }
    };
    Cell.prototype.setScrollLeft = function (scrollLeft) {
        var node = this.cell.current;
        if (node) {
            node.style.transform = "translateX(" + scrollLeft + "px)";
        }
    };
    Cell.prototype.removeScroll = function () {
        var node = this.cell.current;
        if (node) {
            node.style.transform = 'none';
        }
    };
    Cell.prototype.getEvents = function () {
        var _a = this.props, column = _a.column, cellMetaData = _a.cellMetaData, idx = _a.idx, rowIdx = _a.rowIdx, rowData = _a.rowData;
        var columnEvents = column.events;
        var allEvents = {
            onClick: this.handleCellClick,
            onMouseDown: this.handleCellMouseDown,
            onMouseEnter: this.handleCellMouseEnter,
            onDoubleClick: this.handleCellDoubleClick,
            onContextMenu: this.handleCellContextMenu,
            onDragOver: this.handleDragOver
        };
        if (!columnEvents) {
            return allEvents;
        }
        var _loop_1 = function (event_1) {
            var columnEventHandler = columnEvents[event_1];
            if (columnEventHandler) {
                var eventInfo_1 = {
                    idx: idx,
                    rowIdx: rowIdx,
                    column: column,
                    rowId: rowData[cellMetaData.rowKey]
                };
                if (allEvents.hasOwnProperty(event_1)) {
                    var existingEvent_1 = allEvents[event_1];
                    allEvents[event_1] = function (e) {
                        existingEvent_1(e);
                        columnEventHandler(e, eventInfo_1);
                    };
                }
                else {
                    allEvents[event_1] = function (e) {
                        columnEventHandler(e, eventInfo_1);
                    };
                }
            }
        };
        for (var event_1 in columnEvents) {
            _loop_1(event_1);
        }
        return allEvents;
    };
    Cell.prototype.render = function () {
        var _a = this.props, column = _a.column, children = _a.children, expandableOptions = _a.expandableOptions, cellMetaData = _a.cellMetaData, rowData = _a.rowData;
        if (column.hidden) {
            return null;
        }
        var style = this.getStyle();
        var className = this.getCellClass();
        var cellContent = children || React.createElement(CellContent, __assign({}, this.props));
        var events = this.getEvents();
        var cellExpander = expandableOptions && expandableOptions.canExpand && (React.createElement(CellExpand, { expanded: expandableOptions.expanded, onCellExpand: this.handleCellExpand }));
        return (React.createElement("div", __assign({ ref: this.cell, className: className, style: style }, events),
            React.createElement(CellActions, { column: column, rowData: rowData, cellMetaData: cellMetaData }),
            cellExpander,
            cellContent));
    };
    Cell.defaultProps = {
        value: ''
    };
    return Cell;
}(React.PureComponent));
export default Cell;
//# sourceMappingURL=Cell.js.map