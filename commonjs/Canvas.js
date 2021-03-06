"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_is_1 = require("react-is");
var Row_1 = tslib_1.__importDefault(require("./Row"));
var RowsContainer_1 = tslib_1.__importDefault(require("./RowsContainer"));
var RowGroup_1 = tslib_1.__importDefault(require("./RowGroup"));
var masks_1 = require("./masks");
var rowUtils = tslib_1.__importStar(require("./RowUtils"));
var canvasUtils_1 = require("./utils/canvasUtils");
var enums_1 = require("./common/enums");
var Canvas = /** @class */ (function (_super) {
    tslib_1.__extends(Canvas, _super);
    function Canvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvas = react_1.default.createRef();
        _this.interactionMasks = react_1.default.createRef();
        _this.rows = new Map();
        _this._scroll = { scrollTop: 0, scrollLeft: 0 };
        _this.handleScroll = function (e) {
            var _a = e.currentTarget, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
            _this._scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
            if (_this.props.onScroll) {
                _this.props.onScroll(_this._scroll);
            }
        };
        _this.onHitBottomCanvas = function () {
            var current = _this.canvas.current;
            if (current) {
                current.scrollTop += _this.props.rowHeight + _this.getClientScrollTopOffset(current);
            }
        };
        _this.onHitTopCanvas = function () {
            var current = _this.canvas.current;
            if (current) {
                current.scrollTop -= _this.props.rowHeight - _this.getClientScrollTopOffset(current);
            }
        };
        _this.handleHitColummBoundary = function (_a) {
            var idx = _a.idx;
            _this.scrollToColumn(idx);
        };
        _this.scrollToColumn = function (idx) {
            var current = _this.canvas.current;
            if (!current)
                return;
            var scrollLeft = current.scrollLeft, clientWidth = current.clientWidth;
            var newScrollLeft = canvasUtils_1.getColumnScrollPosition(_this.props.columns, idx, scrollLeft, clientWidth);
            if (newScrollLeft !== 0) {
                current.scrollLeft = scrollLeft + newScrollLeft;
            }
        };
        _this.getRowByRef = function (i) {
            // check if wrapped with React DND drop target
            if (!_this.rows.has(i))
                return;
            var row = _this.rows.get(i);
            var wrappedRow = row.getDecoratedComponentInstance ? row.getDecoratedComponentInstance(i) : null;
            return wrappedRow ? wrappedRow.row : row;
        };
        _this.getRowTop = function (rowIdx) {
            var row = _this.getRowByRef(rowIdx);
            if (row && row.getRowTop) {
                return row.getRowTop();
            }
            return _this.props.rowHeight * rowIdx;
        };
        _this.getRowHeight = function (rowIdx) {
            var row = _this.getRowByRef(rowIdx);
            if (row && row.getRowHeight) {
                return row.getRowHeight();
            }
            return _this.props.rowHeight;
        };
        _this.getRowColumns = function (rowIdx) {
            var row = _this.getRowByRef(rowIdx);
            return row && row.props ? row.props.columns : _this.props.columns;
        };
        return _this;
    }
    Canvas.prototype.componentDidMount = function () {
        this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(enums_1.EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
    };
    Canvas.prototype.componentWillUnmount = function () {
        this.unsubscribeScrollToColumn();
    };
    Canvas.prototype.componentDidUpdate = function (prevProps) {
        var scrollToRowIndex = this.props.scrollToRowIndex;
        if (scrollToRowIndex && prevProps.scrollToRowIndex !== scrollToRowIndex) {
            this.scrollToRow(scrollToRowIndex);
        }
    };
    Canvas.prototype.scrollToRow = function (scrollToRowIndex) {
        var current = this.canvas.current;
        if (!current)
            return;
        var _a = this.props, rowHeight = _a.rowHeight, rowsCount = _a.rowsCount, height = _a.height;
        current.scrollTop = Math.min(scrollToRowIndex * rowHeight, rowsCount * rowHeight - height);
    };
    Canvas.prototype.getRows = function (rowOverscanStartIdx, rowOverscanEndIdx) {
        var rows = [];
        var i = rowOverscanStartIdx;
        while (i < rowOverscanEndIdx) {
            var row = this.props.rowGetter(i);
            var subRowDetails = void 0;
            if (this.props.getSubRowDetails) {
                subRowDetails = this.props.getSubRowDetails(row);
            }
            rows.push({ row: row, subRowDetails: subRowDetails });
            i++;
        }
        return rows;
    };
    Canvas.prototype.getScroll = function () {
        var _a = this.canvas.current, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
        return { scrollTop: scrollTop, scrollLeft: scrollLeft };
    };
    Canvas.prototype.getClientScrollTopOffset = function (node) {
        var rowHeight = this.props.rowHeight;
        var scrollVariation = node.scrollTop % rowHeight;
        return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
    };
    Canvas.prototype.isRowSelected = function (idx, row) {
        var _this = this;
        // Use selectedRows if set
        if (this.props.selectedRows) {
            var selectedRow = this.props.selectedRows.find(function (r) {
                var rowKeyValue = rowUtils.get(row, _this.props.rowKey);
                return r[_this.props.rowKey] === rowKeyValue;
            });
            return !!(selectedRow && selectedRow.isSelected);
        }
        // Else use new rowSelection props
        if (this.props.rowSelection) {
            var _a = this.props.rowSelection, keys = _a.keys, indexes = _a.indexes, isSelectedKey = _a.isSelectedKey;
            return rowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
        }
        return false;
    };
    Canvas.prototype.setScrollLeft = function (scrollLeft) {
        var _this = this;
        var current = this.interactionMasks.current;
        if (current) {
            current.setScrollLeft(scrollLeft);
        }
        this.rows.forEach(function (r, idx) {
            var row = _this.getRowByRef(idx);
            if (row && row.setScrollLeft) {
                row.setScrollLeft(scrollLeft);
            }
        });
    };
    Canvas.prototype.renderCustomRowRenderer = function (props) {
        var ref = props.ref, otherProps = tslib_1.__rest(props, ["ref"]);
        var CustomRowRenderer = this.props.rowRenderer;
        var customRowRendererProps = tslib_1.__assign(tslib_1.__assign({}, otherProps), { renderBaseRow: function (p) { return react_1.default.createElement(Row_1.default, tslib_1.__assign({ ref: ref }, p)); } });
        if (react_is_1.isElement(CustomRowRenderer)) {
            if (CustomRowRenderer.type === Row_1.default) {
                // In the case where Row is specified as the custom render, ensure the correct ref is passed
                return react_1.default.createElement(Row_1.default, tslib_1.__assign({}, props));
            }
            return react_1.default.cloneElement(CustomRowRenderer, customRowRendererProps);
        }
        return react_1.default.createElement(CustomRowRenderer, tslib_1.__assign({}, customRowRendererProps));
    };
    Canvas.prototype.renderGroupRow = function (props) {
        var ref = props.ref, columns = props.columns, rowGroupProps = tslib_1.__rest(props, ["ref", "columns"]);
        var row = props.row;
        return (react_1.default.createElement(RowGroup_1.default, tslib_1.__assign({}, rowGroupProps, row.__metaData, { columns: columns, name: row.name, eventBus: this.props.eventBus, renderer: this.props.rowGroupRenderer, renderBaseRow: function (p) { return react_1.default.createElement(Row_1.default, tslib_1.__assign({ ref: ref }, p)); } })));
    };
    Canvas.prototype.renderRow = function (props) {
        var row = props.row;
        if (row.__metaData && row.__metaData.getRowRenderer) {
            return row.__metaData.getRowRenderer(this.props, props.idx);
        }
        if (row.__metaData && row.__metaData.isGroup) {
            return this.renderGroupRow(props);
        }
        if (this.props.rowRenderer) {
            return this.renderCustomRowRenderer(props);
        }
        return react_1.default.createElement(Row_1.default, tslib_1.__assign({}, props));
    };
    Canvas.prototype.renderPlaceholder = function (key, height) {
        // just renders empty cells
        // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
        return (react_1.default.createElement("div", { key: key, style: { height: height } }, this.props.columns.map(function (column) { return react_1.default.createElement("div", { style: { width: column.width }, key: column.key }); })));
    };
    Canvas.prototype.render = function () {
        var _this = this;
        var _a = this.props, rowOverscanStartIdx = _a.rowOverscanStartIdx, rowOverscanEndIdx = _a.rowOverscanEndIdx, cellMetaData = _a.cellMetaData, columns = _a.columns, colOverscanStartIdx = _a.colOverscanStartIdx, colOverscanEndIdx = _a.colOverscanEndIdx, colVisibleStartIdx = _a.colVisibleStartIdx, colVisibleEndIdx = _a.colVisibleEndIdx, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, rowHeight = _a.rowHeight, rowsCount = _a.rowsCount, totalColumnWidth = _a.totalColumnWidth, totalWidth = _a.totalWidth, height = _a.height, rowGetter = _a.rowGetter, contextMenu = _a.contextMenu;
        var RowsContainer = this.props.RowsContainer || RowsContainer_1.default;
        var rows = this.getRows(rowOverscanStartIdx, rowOverscanEndIdx)
            .map(function (_a, idx) {
            var row = _a.row, subRowDetails = _a.subRowDetails;
            var rowIdx = rowOverscanStartIdx + idx;
            return row && _this.renderRow({
                key: rowIdx,
                ref: function (row) {
                    if (row) {
                        _this.rows.set(rowIdx, row);
                    }
                    else {
                        _this.rows.delete(rowIdx);
                    }
                },
                idx: rowIdx,
                rowVisibleStartIdx: _this.props.rowVisibleStartIdx,
                rowVisibleEndIdx: _this.props.rowVisibleEndIdx,
                row: row,
                height: rowHeight,
                columns: columns,
                isSelected: _this.isRowSelected(rowIdx, row),
                cellMetaData: cellMetaData,
                subRowDetails: subRowDetails,
                colVisibleStartIdx: colVisibleStartIdx,
                colVisibleEndIdx: colVisibleEndIdx,
                colOverscanStartIdx: colOverscanStartIdx,
                colOverscanEndIdx: colOverscanEndIdx,
                lastFrozenColumnIndex: lastFrozenColumnIndex,
                isScrolling: _this.props.isScrolling,
                scrollLeft: _this._scroll.scrollLeft
            });
        });
        if (rowOverscanStartIdx > 0) {
            rows.unshift(this.renderPlaceholder('top', rowOverscanStartIdx * rowHeight));
        }
        if (rowsCount - rowOverscanEndIdx > 0) {
            rows.push(this.renderPlaceholder('bottom', (rowsCount - rowOverscanEndIdx) * rowHeight));
        }
        return (react_1.default.createElement("div", { className: "react-grid-Canvas", style: { width: totalWidth, height: height }, ref: this.canvas, onScroll: this.handleScroll },
            react_1.default.createElement(masks_1.InteractionMasks, tslib_1.__assign({ ref: this.interactionMasks, rowGetter: rowGetter, rowsCount: rowsCount, rowHeight: rowHeight, columns: columns, rowVisibleStartIdx: this.props.rowVisibleStartIdx, rowVisibleEndIdx: this.props.rowVisibleEndIdx, colVisibleStartIdx: colVisibleStartIdx, colVisibleEndIdx: colVisibleEndIdx, enableCellSelect: this.props.enableCellSelect, enableCellAutoFocus: this.props.enableCellAutoFocus, cellNavigationMode: this.props.cellNavigationMode, eventBus: this.props.eventBus, contextMenu: this.props.contextMenu, onHitBottomBoundary: this.onHitBottomCanvas, onHitTopBoundary: this.onHitTopCanvas, onHitLeftBoundary: this.handleHitColummBoundary, onHitRightBoundary: this.handleHitColummBoundary, scrollLeft: this._scroll.scrollLeft, scrollTop: this._scroll.scrollTop, getRowHeight: this.getRowHeight, getRowTop: this.getRowTop, getRowColumns: this.getRowColumns, editorPortalTarget: this.props.editorPortalTarget }, this.props.interactionMasksMetaData)),
            react_1.default.createElement(RowsContainer, { id: contextMenu ? contextMenu.props.id : 'rowsContainer' },
                react_1.default.createElement("div", { style: { width: totalColumnWidth } }, rows))));
    };
    Canvas.displayName = 'Canvas';
    return Canvas;
}(react_1.default.PureComponent));
exports.default = Canvas;
//# sourceMappingURL=Canvas.js.map