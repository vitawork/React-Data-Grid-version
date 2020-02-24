import { __assign, __extends, __read, __spread } from "tslib";
import React from 'react';
import Grid from './Grid';
import ToolbarContainer from './ToolbarContainer';
import CheckboxEditor from './common/editors/CheckboxEditor';
import { SelectAll } from './formatters';
import * as rowUtils from './RowUtils';
import { getSize } from './ColumnUtils';
import KeyCodes from './KeyCodes';
import { sameColumn, sameColumns, recalculate, resizeColumn } from './ColumnMetrics';
import { EventBus } from './masks';
import { CellNavigationMode, EventTypes, UpdateActions, HeaderRowType } from './common/enums';
function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
    return rowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);
}
/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <ReactDataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={3} />
*/
var ReactDataGrid = /** @class */ (function (_super) {
    __extends(ReactDataGrid, _super);
    function ReactDataGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.grid = React.createRef();
        _this.base = React.createRef();
        _this.selectAllCheckbox = React.createRef();
        _this.eventBus = new EventBus();
        _this._keysDown = new Set();
        _this.metricsUpdated = function () {
            var columnMetrics = _this.createColumnMetrics();
            _this.setState({ columnMetrics: columnMetrics });
        };
        _this.handleColumnResize = function (idx, width) {
            var columnMetrics = resizeColumn(_this.state.columnMetrics, idx, width);
            _this.setState({ columnMetrics: columnMetrics });
            if (_this.props.onColumnResize) {
                _this.props.onColumnResize(idx, width);
            }
        };
        _this.handleDragEnter = function (overRowIdx) {
            _this.eventBus.dispatch(EventTypes.DRAG_ENTER, overRowIdx);
        };
        _this.handleViewportKeyDown = function (e) {
            // Track which keys are currently down for shift clicking etc
            _this._keysDown.add(e.keyCode);
            var onGridKeyDown = _this.props.onGridKeyDown;
            if (onGridKeyDown) {
                onGridKeyDown(e);
            }
        };
        _this.handleViewportKeyUp = function (e) {
            // Track which keys are currently down for shift clicking etc
            _this._keysDown.delete(e.keyCode);
            var onGridKeyUp = _this.props.onGridKeyUp;
            if (onGridKeyUp) {
                onGridKeyUp(e);
            }
        };
        _this.handlerCellClick = function (_a) {
            var rowIdx = _a.rowIdx, idx = _a.idx;
            var _b = _this.props, onRowClick = _b.onRowClick, rowGetter = _b.rowGetter;
            _this.selectCell({ rowIdx: rowIdx, idx: idx });
            if (onRowClick) {
                onRowClick(rowIdx, rowGetter(rowIdx), _this.getColumn(idx));
            }
        };
        _this.handleCellMouseDown = function (position) {
            _this.eventBus.dispatch(EventTypes.SELECT_START, position);
        };
        _this.handleCellMouseEnter = function (position) {
            _this.eventBus.dispatch(EventTypes.SELECT_UPDATE, position);
        };
        _this.handleWindowMouseUp = function () {
            _this.eventBus.dispatch(EventTypes.SELECT_END);
        };
        _this.handleCellContextMenu = function (position) {
            _this.selectCell(position);
        };
        _this.handleCellDoubleClick = function (_a) {
            var rowIdx = _a.rowIdx, idx = _a.idx;
            var _b = _this.props, onRowDoubleClick = _b.onRowDoubleClick, rowGetter = _b.rowGetter;
            if (onRowDoubleClick) {
                onRowDoubleClick(rowIdx, rowGetter(rowIdx), _this.getColumn(idx));
            }
            _this.openCellEditor(rowIdx, idx);
        };
        _this.handleToggleFilter = function () {
            // setState() does not immediately mutate this.state but creates a pending state transition.
            // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
            _this.setState(function (prevState) { return ({ canFilter: !prevState.canFilter }); }, function () {
                if (_this.state.canFilter === false && _this.props.onClearFilters) {
                    _this.props.onClearFilters();
                }
            });
        };
        _this.handleDragHandleDoubleClick = function (e) {
            var _a;
            var cellKey = _this.getColumn(e.idx).key;
            _this.handleGridRowsUpdated(cellKey, e.rowIdx, _this.props.rowsCount - 1, (_a = {}, _a[cellKey] = e.rowData[cellKey], _a), UpdateActions.COLUMN_FILL);
        };
        _this.handleGridRowsUpdated = function (cellKey, fromRow, toRow, updated, action, originRow) {
            var _a = _this.props, rowGetter = _a.rowGetter, rowKey = _a.rowKey, onGridRowsUpdated = _a.onGridRowsUpdated;
            if (!onGridRowsUpdated) {
                return;
            }
            var rowIds = [];
            for (var i = fromRow; i <= toRow; i++) {
                rowIds.push(rowGetter(i)[rowKey]);
            }
            var fromRowData = rowGetter(action === UpdateActions.COPY_PASTE ? originRow : fromRow);
            var fromRowId = fromRowData[rowKey];
            var toRowId = rowGetter(toRow)[rowKey];
            onGridRowsUpdated({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, fromRowId: fromRowId, toRowId: toRowId, rowIds: rowIds, updated: updated, action: action, fromRowData: fromRowData });
        };
        _this.handleCommit = function (commit) {
            var targetRow = commit.rowIdx;
            _this.handleGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, UpdateActions.CELL_UPDATE);
        };
        _this.handleSort = function (sortColumn, sortDirection) {
            _this.setState({ sortColumn: sortColumn, sortDirection: sortDirection }, function () {
                var onGridSort = _this.props.onGridSort;
                if (onGridSort) {
                    onGridSort(sortColumn, sortDirection);
                }
            });
        };
        _this.useNewRowSelection = function () {
            return _this.props.rowSelection && _this.props.rowSelection.selectBy;
        };
        // return false if not a shift select so can be handled as normal row selection
        _this.handleShiftSelect = function (rowIdx) {
            var rowSelection = _this.props.rowSelection;
            if (rowSelection && _this.state.lastRowIdxUiSelected > -1 && _this.isSingleKeyDown(KeyCodes.Shift)) {
                var _a = rowSelection.selectBy, keys = _a.keys, indexes = _a.indexes, isSelectedKey = _a.isSelectedKey;
                var isPreviouslySelected = isRowSelected(keys, indexes, isSelectedKey, _this.props.rowGetter(rowIdx), rowIdx);
                if (isPreviouslySelected)
                    return false;
                var handled = false;
                if (rowIdx > _this.state.lastRowIdxUiSelected) {
                    var rowsSelected = [];
                    for (var i = _this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
                        rowsSelected.push({ rowIdx: i, row: _this.props.rowGetter(i) });
                    }
                    if (typeof rowSelection.onRowsSelected === 'function') {
                        rowSelection.onRowsSelected(rowsSelected);
                    }
                    handled = true;
                }
                else if (rowIdx < _this.state.lastRowIdxUiSelected) {
                    var rowsSelected = [];
                    for (var i = rowIdx; i <= _this.state.lastRowIdxUiSelected - 1; i++) {
                        rowsSelected.push({ rowIdx: i, row: _this.props.rowGetter(i) });
                    }
                    if (typeof rowSelection.onRowsSelected === 'function') {
                        rowSelection.onRowsSelected(rowsSelected);
                    }
                    handled = true;
                }
                if (handled) {
                    _this.setState({ lastRowIdxUiSelected: rowIdx });
                }
                return handled;
            }
            return false;
        };
        _this.handleNewRowSelect = function (rowIdx, rowData) {
            var current = _this.selectAllCheckbox.current;
            if (current && current.checked === true) {
                current.checked = false;
            }
            var rowSelection = _this.props.rowSelection;
            if (rowSelection) {
                var _a = rowSelection.selectBy, keys = _a.keys, indexes = _a.indexes, isSelectedKey = _a.isSelectedKey;
                var isPreviouslySelected = isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);
                _this.setState({ lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx });
                var cb = isPreviouslySelected ? rowSelection.onRowsDeselected : rowSelection.onRowsSelected;
                if (typeof cb === 'function') {
                    cb([{ rowIdx: rowIdx, row: rowData }]);
                }
            }
        };
        // columnKey not used here as this function will select the whole row,
        // but needed to match the function signature in the CheckboxEditor
        _this.handleRowSelect = function (rowIdx, columnKey, rowData, event) {
            event.stopPropagation();
            var rowSelection = _this.props.rowSelection;
            if (_this.useNewRowSelection()) {
                if (rowSelection && rowSelection.enableShiftSelect === true) {
                    if (!_this.handleShiftSelect(rowIdx)) {
                        _this.handleNewRowSelect(rowIdx, rowData);
                    }
                }
                else {
                    _this.handleNewRowSelect(rowIdx, rowData);
                }
            }
            else { // Fallback to old onRowSelect handler
                var selectedRows = _this.props.enableRowSelect === 'single' ? [] : __spread(_this.state.selectedRows);
                var selectedRow = _this.getSelectedRow(selectedRows, rowData[_this.props.rowKey]);
                if (selectedRow) {
                    selectedRow.isSelected = !selectedRow.isSelected;
                }
                else {
                    rowData.isSelected = true;
                    selectedRows.push(rowData);
                }
                _this.setState({ selectedRows: selectedRows });
                if (_this.props.onRowSelect) {
                    _this.props.onRowSelect(selectedRows.filter(function (r) { return r.isSelected === true; }));
                }
            }
        };
        _this.handleCheckboxChange = function (e) {
            var allRowsSelected = e.currentTarget.checked;
            var rowSelection = _this.props.rowSelection;
            if (rowSelection && _this.useNewRowSelection()) {
                var _a = rowSelection.selectBy, keys = _a.keys, indexes = _a.indexes, isSelectedKey = _a.isSelectedKey;
                if (allRowsSelected && typeof rowSelection.onRowsSelected === 'function') {
                    var selectedRows = [];
                    for (var i = 0; i < _this.props.rowsCount; i++) {
                        var rowData = _this.props.rowGetter(i);
                        if (!isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
                            selectedRows.push({ rowIdx: i, row: rowData });
                        }
                    }
                    if (selectedRows.length > 0) {
                        rowSelection.onRowsSelected(selectedRows);
                    }
                }
                else if (!allRowsSelected && typeof rowSelection.onRowsDeselected === 'function') {
                    var deselectedRows = [];
                    for (var i = 0; i < _this.props.rowsCount; i++) {
                        var rowData = _this.props.rowGetter(i);
                        if (isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
                            deselectedRows.push({ rowIdx: i, row: rowData });
                        }
                    }
                    if (deselectedRows.length > 0) {
                        rowSelection.onRowsDeselected(deselectedRows);
                    }
                }
            }
            else {
                var selectedRows = [];
                for (var i = 0; i < _this.props.rowsCount; i++) {
                    var row = __assign(__assign({}, _this.props.rowGetter(i)), { isSelected: allRowsSelected });
                    selectedRows.push(row);
                }
                _this.setState({ selectedRows: selectedRows });
                if (typeof _this.props.onRowSelect === 'function') {
                    _this.props.onRowSelect(selectedRows.filter(function (r) { return r.isSelected === true; }));
                }
            }
        };
        var initialState = {
            columnMetrics: _this.createColumnMetrics(),
            selectedRows: [],
            canFilter: false,
            lastRowIdxUiSelected: -1
        };
        if (_this.props.sortColumn && _this.props.sortDirection) {
            initialState.sortColumn = _this.props.sortColumn;
            initialState.sortDirection = _this.props.sortDirection;
        }
        _this.state = initialState;
        return _this;
    }
    ReactDataGrid.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.metricsUpdated);
        if (this.props.cellRangeSelection) {
            window.addEventListener('mouseup', this.handleWindowMouseUp);
        }
        this.metricsUpdated();
    };
    ReactDataGrid.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.metricsUpdated);
        window.removeEventListener('mouseup', this.handleWindowMouseUp);
    };
    ReactDataGrid.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.columns && (!sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality)
            || nextProps.minWidth !== this.props.minWidth)) {
            var columnMetrics = this.createColumnMetrics(nextProps);
            this.setState({ columnMetrics: columnMetrics });
        }
    };
    ReactDataGrid.prototype.selectCell = function (_a, openEditor) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        this.eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx: rowIdx, idx: idx }, openEditor);
    };
    ReactDataGrid.prototype.gridWidth = function () {
        var current = this.grid.current;
        return current && current.parentElement ? current.parentElement.offsetWidth : 0;
    };
    ReactDataGrid.prototype.getTotalWidth = function () {
        if (this.grid.current) {
            return this.gridWidth();
        }
        return getSize(this.props.columns) * this.props.minColumnWidth;
    };
    ReactDataGrid.prototype.getColumn = function (idx) {
        return this.state.columnMetrics.columns[idx];
    };
    ReactDataGrid.prototype.getSize = function () {
        return this.state.columnMetrics.columns.length;
    };
    ReactDataGrid.prototype.createColumnMetrics = function (props) {
        if (props === void 0) { props = this.props; }
        var gridColumns = this.setupGridColumns(props);
        var metrics = {
            columns: gridColumns,
            minColumnWidth: this.props.minColumnWidth,
            totalWidth: this.props.minWidth || this.getTotalWidth()
        };
        return recalculate(metrics);
    };
    ReactDataGrid.prototype.isSingleKeyDown = function (keyCode) {
        return this._keysDown.has(keyCode) && this._keysDown.size === 1;
    };
    ReactDataGrid.prototype.getSelectedRow = function (rows, key) {
        var _this = this;
        return rows.find(function (r) { return r[_this.props.rowKey] === key; });
    };
    ReactDataGrid.prototype.getRowOffsetHeight = function () {
        return this.getHeaderRows().reduce(function (offsetHeight, row) { return offsetHeight += row.height; }, 0);
    };
    ReactDataGrid.prototype.getHeaderRows = function () {
        var _a = this.props, headerRowHeight = _a.headerRowHeight, rowHeight = _a.rowHeight, onAddFilter = _a.onAddFilter, headerFiltersHeight = _a.headerFiltersHeight;
        var rows = [{ height: headerRowHeight || rowHeight, rowType: HeaderRowType.HEADER }];
        if (this.state.canFilter === true) {
            rows.push({
                rowType: HeaderRowType.FILTER,
                filterable: true,
                onFilterChange: onAddFilter,
                height: headerFiltersHeight
            });
        }
        return rows;
    };
    ReactDataGrid.prototype.getRowSelectionProps = function () {
        return this.props.rowSelection && this.props.rowSelection.selectBy;
    };
    ReactDataGrid.prototype.getSelectedRows = function () {
        if (this.props.rowSelection) {
            return;
        }
        return this.state.selectedRows.filter(function (r) { return r.isSelected === true; });
    };
    ReactDataGrid.prototype.openCellEditor = function (rowIdx, idx) {
        this.selectCell({ rowIdx: rowIdx, idx: idx }, true);
    };
    ReactDataGrid.prototype.scrollToColumn = function (colIdx) {
        this.eventBus.dispatch(EventTypes.SCROLL_TO_COLUMN, colIdx);
    };
    ReactDataGrid.prototype.setupGridColumns = function (props) {
        if (props === void 0) { props = this.props; }
        var columns = props.columns;
        if (this._cachedColumns === columns) {
            return this._cachedComputedColumns;
        }
        this._cachedColumns = columns;
        if (this.props.rowActionsCell || (props.enableRowSelect && !this.props.rowSelection) || (props.rowSelection && props.rowSelection.showCheckbox !== false)) {
            var SelectAllComponent = this.props.selectAllRenderer;
            var headerRenderer = props.enableRowSelect === 'single'
                ? undefined
                : React.createElement(SelectAllComponent, { onChange: this.handleCheckboxChange, ref: this.selectAllCheckbox });
            var Formatter = (this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor);
            var selectColumn = {
                key: 'select-row',
                name: '',
                formatter: React.createElement(Formatter, { rowSelection: this.props.rowSelection }),
                onCellChange: this.handleRowSelect,
                filterable: false,
                headerRenderer: headerRenderer,
                width: 60,
                frozen: true,
                getRowMetaData: function (rowData) { return rowData; },
                cellClass: this.props.rowActionsCell ? 'rdg-row-actions-cell' : ''
            };
            this._cachedComputedColumns = Array.isArray(columns)
                ? __spread([selectColumn], columns) : columns.unshift(selectColumn);
        }
        else {
            this._cachedComputedColumns = columns.slice(0);
        }
        return this._cachedComputedColumns;
    };
    ReactDataGrid.prototype.render = function () {
        var cellMetaData = {
            rowKey: this.props.rowKey,
            onCellClick: this.handlerCellClick,
            onCellContextMenu: this.handleCellContextMenu,
            onCellDoubleClick: this.handleCellDoubleClick,
            onCellExpand: this.props.onCellExpand,
            onRowExpandToggle: this.props.onRowExpandToggle,
            getCellActions: this.props.getCellActions,
            onDeleteSubRow: this.props.onDeleteSubRow,
            onAddSubRow: this.props.onAddSubRow,
            onDragEnter: this.handleDragEnter
        };
        if (this.props.cellRangeSelection) {
            cellMetaData.onCellMouseDown = this.handleCellMouseDown;
            cellMetaData.onCellMouseEnter = this.handleCellMouseEnter;
        }
        var interactionMasksMetaData = {
            onCheckCellIsEditable: this.props.onCheckCellIsEditable,
            onCellCopyPaste: this.props.onCellCopyPaste,
            onGridRowsUpdated: this.handleGridRowsUpdated,
            onDragHandleDoubleClick: this.handleDragHandleDoubleClick,
            onCellSelected: this.props.onCellSelected,
            onCellDeSelected: this.props.onCellDeSelected,
            onCellRangeSelectionStarted: this.props.cellRangeSelection && this.props.cellRangeSelection.onStart,
            onCellRangeSelectionUpdated: this.props.cellRangeSelection && this.props.cellRangeSelection.onUpdate,
            onCellRangeSelectionCompleted: this.props.cellRangeSelection && this.props.cellRangeSelection.onComplete,
            onCommit: this.handleCommit
        };
        var containerWidth = this.props.minWidth || this.gridWidth();
        var gridWidth = containerWidth;
        // depending on the current lifecycle stage, gridWidth() may not initialize correctly
        // this also handles cases where it always returns undefined -- such as when inside a div with display:none
        // eg Bootstrap tabs and collapses
        if (Number.isNaN(containerWidth) || containerWidth === 0) {
            containerWidth = '100%';
            gridWidth = '100%';
        }
        return (React.createElement("div", { className: "react-grid-Container", style: { width: containerWidth }, ref: this.grid },
            React.createElement(ToolbarContainer, { toolbar: this.props.toolbar, columns: this.props.columns, rowsCount: this.props.rowsCount, onToggleFilter: this.handleToggleFilter }),
            React.createElement(Grid, { ref: this.base, rowKey: this.props.rowKey, headerRows: this.getHeaderRows(), draggableHeaderCell: this.props.draggableHeaderCell, getValidFilterValues: this.props.getValidFilterValues, columnMetrics: this.state.columnMetrics, rowGetter: this.props.rowGetter, rowsCount: this.props.rowsCount, rowHeight: this.props.rowHeight, rowRenderer: this.props.rowRenderer, rowGroupRenderer: this.props.rowGroupRenderer, cellMetaData: cellMetaData, selectedRows: this.getSelectedRows(), rowSelection: this.getRowSelectionProps(), rowOffsetHeight: this.getRowOffsetHeight(), sortColumn: this.state.sortColumn, sortDirection: this.state.sortDirection, onSort: this.handleSort, minHeight: this.props.minHeight, totalWidth: gridWidth, onViewportKeydown: this.handleViewportKeyDown, onViewportKeyup: this.handleViewportKeyUp, onColumnResize: this.handleColumnResize, scrollToRowIndex: this.props.scrollToRowIndex, contextMenu: this.props.contextMenu, enableCellSelect: this.props.enableCellSelect, enableCellAutoFocus: this.props.enableCellAutoFocus, cellNavigationMode: this.props.cellNavigationMode, eventBus: this.eventBus, onScroll: this.props.onScroll, RowsContainer: this.props.RowsContainer, emptyRowsView: this.props.emptyRowsView, onHeaderDrop: this.props.onHeaderDrop, getSubRowDetails: this.props.getSubRowDetails, editorPortalTarget: this.props.editorPortalTarget, interactionMasksMetaData: interactionMasksMetaData })));
    };
    ReactDataGrid.displayName = 'ReactDataGrid';
    ReactDataGrid.defaultProps = {
        enableCellSelect: false,
        rowHeight: 35,
        headerFiltersHeight: 45,
        enableRowSelect: false,
        minHeight: 350,
        rowKey: 'id',
        cellNavigationMode: CellNavigationMode.NONE,
        enableCellAutoFocus: true,
        minColumnWidth: 80,
        selectAllRenderer: SelectAll,
        columnEquality: sameColumn,
        editorPortalTarget: document.body
    };
    return ReactDataGrid;
}(React.Component));
export default ReactDataGrid;
//# sourceMappingURL=ReactDataGrid.js.map