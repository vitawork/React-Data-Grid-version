"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnUtils_1 = require("../ColumnUtils");
var enums_1 = require("../common/enums");
exports.OVERSCAN_ROWS = 2;
var min = Math.min, max = Math.max, ceil = Math.ceil, round = Math.round;
function getGridState(props) {
    var totalNumberColumns = props.columnMetrics.columns.length;
    var canvasHeight = props.minHeight - props.rowOffsetHeight;
    var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
    var rowOverscanEndIdx = min(props.rowsCount, renderedRowsCount * 2);
    return {
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: rowOverscanEndIdx,
        rowVisibleStartIdx: 0,
        rowVisibleEndIdx: renderedRowsCount,
        height: canvasHeight,
        scrollTop: 0,
        scrollLeft: 0,
        colVisibleStartIdx: 0,
        colVisibleEndIdx: totalNumberColumns,
        colOverscanStartIdx: 0,
        colOverscanEndIdx: totalNumberColumns,
        isScrolling: false,
        lastFrozenColumnIndex: 0
    };
}
exports.getGridState = getGridState;
function findLastFrozenColumnIndex(columns) {
    return columns.findIndex(function (c) { return ColumnUtils_1.isFrozen(c); });
}
exports.findLastFrozenColumnIndex = findLastFrozenColumnIndex;
function getTotalFrozenColumnWidth(columns) {
    var lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
    if (lastFrozenColumnIndex === -1) {
        return 0;
    }
    var lastFrozenColumn = columns[lastFrozenColumnIndex];
    return lastFrozenColumn.left + lastFrozenColumn.width;
}
function getColumnCountForWidth(columns, initialWidth, colVisibleStartIdx) {
    var width = initialWidth;
    var count = 0;
    columns.forEach(function (column, idx) {
        if (idx >= colVisibleStartIdx) {
            width -= column.width;
            if (width >= 0) {
                count++;
            }
        }
    });
    return count;
}
function getNonFrozenVisibleColStartIdx(columns, scrollLeft) {
    var remainingScroll = scrollLeft;
    var lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
    var nonFrozenColumns = columns.slice(lastFrozenColumnIndex + 1);
    var columnIndex = lastFrozenColumnIndex;
    while (remainingScroll >= 0 && columnIndex < nonFrozenColumns.length) {
        columnIndex++;
        var column = columns[columnIndex];
        remainingScroll -= column ? column.width : 0;
    }
    return max(columnIndex, 0);
}
exports.getNonFrozenVisibleColStartIdx = getNonFrozenVisibleColStartIdx;
function getNonFrozenRenderedColumnCount(columnMetrics, viewportDomWidth, scrollLeft) {
    var columns = columnMetrics.columns, totalColumnWidth = columnMetrics.totalColumnWidth;
    if (columns.length === 0) {
        return 0;
    }
    var colVisibleStartIdx = getNonFrozenVisibleColStartIdx(columns, scrollLeft);
    var totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns);
    var viewportWidth = viewportDomWidth > 0 ? viewportDomWidth : totalColumnWidth;
    var firstColumn = columns[colVisibleStartIdx];
    // calculate the portion width of first column hidden behind frozen columns
    var scrolledFrozenWidth = totalFrozenColumnWidth + scrollLeft;
    var firstColumnHiddenWidth = scrolledFrozenWidth > firstColumn.left ? scrolledFrozenWidth - firstColumn.left : 0;
    var initialWidth = viewportWidth - totalFrozenColumnWidth + firstColumnHiddenWidth;
    return getColumnCountForWidth(columns, initialWidth, colVisibleStartIdx);
}
exports.getNonFrozenRenderedColumnCount = getNonFrozenRenderedColumnCount;
function getVisibleBoundaries(gridHeight, rowHeight, scrollTop, rowsCount) {
    var renderedRowsCount = ceil(gridHeight / rowHeight);
    var rowVisibleStartIdx = max(0, round(scrollTop / rowHeight));
    var rowVisibleEndIdx = min(rowVisibleStartIdx + renderedRowsCount, rowsCount);
    return { rowVisibleStartIdx: rowVisibleStartIdx, rowVisibleEndIdx: rowVisibleEndIdx };
}
exports.getVisibleBoundaries = getVisibleBoundaries;
function getScrollDirection(lastScroll, scrollTop, scrollLeft) {
    if (scrollTop !== lastScroll.scrollTop && lastScroll.scrollTop !== undefined) {
        return scrollTop - lastScroll.scrollTop >= 0 ? enums_1.SCROLL_DIRECTION.DOWN : enums_1.SCROLL_DIRECTION.UP;
    }
    if (scrollLeft !== lastScroll.scrollLeft && lastScroll.scrollLeft !== undefined) {
        return scrollLeft - lastScroll.scrollLeft >= 0 ? enums_1.SCROLL_DIRECTION.RIGHT : enums_1.SCROLL_DIRECTION.LEFT;
    }
    return enums_1.SCROLL_DIRECTION.NONE;
}
exports.getScrollDirection = getScrollDirection;
function getRowOverscanStartIdx(scrollDirection, rowVisibleStartIdx) {
    return scrollDirection === enums_1.SCROLL_DIRECTION.UP ? max(0, rowVisibleStartIdx - exports.OVERSCAN_ROWS) : max(0, rowVisibleStartIdx);
}
exports.getRowOverscanStartIdx = getRowOverscanStartIdx;
function getRowOverscanEndIdx(scrollDirection, rowVisibleEndIdx, rowsCount) {
    if (scrollDirection === enums_1.SCROLL_DIRECTION.DOWN) {
        var overscanBoundaryIdx = rowVisibleEndIdx + exports.OVERSCAN_ROWS;
        return min(overscanBoundaryIdx, rowsCount);
    }
    return rowVisibleEndIdx;
}
exports.getRowOverscanEndIdx = getRowOverscanEndIdx;
function getColOverscanStartIdx(scrollDirection, colVisibleStartIdx, lastFrozenColumnIdx) {
    if (scrollDirection === enums_1.SCROLL_DIRECTION.LEFT || scrollDirection === enums_1.SCROLL_DIRECTION.RIGHT) {
        return lastFrozenColumnIdx > -1 ? lastFrozenColumnIdx + 1 : 0;
    }
    return colVisibleStartIdx;
}
exports.getColOverscanStartIdx = getColOverscanStartIdx;
function getColOverscanEndIdx(scrollDirection, colVisibleEndIdx, totalNumberColumns) {
    if (scrollDirection === enums_1.SCROLL_DIRECTION.DOWN || scrollDirection === enums_1.SCROLL_DIRECTION.UP) {
        return colVisibleEndIdx;
    }
    return totalNumberColumns;
}
exports.getColOverscanEndIdx = getColOverscanEndIdx;
//# sourceMappingURL=viewportUtils.js.map