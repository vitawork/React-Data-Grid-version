"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ColumnComparer_1 = require("./ColumnComparer");
exports.sameColumn = ColumnComparer_1.sameColumn;
var ColumnUtils_1 = require("./ColumnUtils");
var getScrollbarSize_1 = tslib_1.__importDefault(require("./getScrollbarSize"));
var utils_1 = require("./common/utils");
function cloneColumns(columns) {
    if (Array.isArray(columns)) {
        return columns.map(function (c) { return (tslib_1.__assign({}, c)); });
    }
    return cloneColumns(columns.toArray());
}
function setColumnWidths(columns, totalWidth) {
    var e_1, _a;
    try {
        for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
            var column = columns_1_1.value;
            if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
                column.width = Math.floor(totalWidth * column.width / 100);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
    var e_2, _a;
    var defferedColumns = columns.filter(function (c) { return !c.width; });
    var columnWidth = Math.floor(unallocatedWidth / defferedColumns.length);
    try {
        for (var columns_2 = tslib_1.__values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
            var column = columns_2_1.value;
            if (column.width)
                continue;
            if (unallocatedWidth <= 0) {
                column.width = minColumnWidth;
            }
            column.width = columnWidth < minColumnWidth ? minColumnWidth : columnWidth;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (columns_2_1 && !columns_2_1.done && (_a = columns_2.return)) _a.call(columns_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function setColumnOffsets(columns) {
    var e_3, _a;
    var left = 0;
    try {
        for (var _b = tslib_1.__values(columns), _c = _b.next(); !_c.done; _c = _b.next()) {
            var column = _c.value;
            column.left = left;
            left += column.width;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
}
function getTotalColumnWidth(columns) {
    return columns.reduce(function (acc, c) { return acc + (c.width || 0); }, 0);
}
function recalculate(metrics) {
    // clone columns so we can safely edit them:
    var columns = cloneColumns(metrics.columns);
    // compute width for columns which specify width
    setColumnWidths(columns, metrics.totalWidth);
    var width = getTotalColumnWidth(columns);
    var unallocatedWidth = metrics.totalWidth - width - getScrollbarSize_1.default();
    // compute width for columns which doesn't specify width
    setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);
    // compute left offset
    setColumnOffsets(columns);
    var frozenColumns = columns.filter(function (c) { return ColumnUtils_1.isFrozen(c); });
    var nonFrozenColumns = columns.filter(function (c) { return !ColumnUtils_1.isFrozen(c); });
    var calculatedColumns = frozenColumns.concat(nonFrozenColumns);
    calculatedColumns.forEach(function (c, i) { return c.idx = i; });
    return {
        width: width,
        columns: calculatedColumns,
        totalWidth: metrics.totalWidth,
        totalColumnWidth: getTotalColumnWidth(columns),
        minColumnWidth: metrics.minColumnWidth
    };
}
exports.recalculate = recalculate;
/**
 * Update column metrics calculation by resizing a column.
 */
function resizeColumn(metrics, index, width) {
    var updatedColumn = tslib_1.__assign({}, metrics.columns[index]);
    updatedColumn.width = Math.max(width, metrics.minColumnWidth);
    var updatedMetrics = tslib_1.__assign({}, metrics);
    updatedMetrics.columns = tslib_1.__spread(metrics.columns);
    updatedMetrics.columns.splice(index, 1, updatedColumn);
    return recalculate(updatedMetrics);
}
exports.resizeColumn = resizeColumn;
function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
    var e_4, _a, e_5, _b, e_6, _c;
    if (ColumnUtils_1.getSize(prevColumns) !== ColumnUtils_1.getSize(nextColumns))
        return false;
    var keys = new Set();
    var prevColumnsMap = new Map();
    var nextColumnsMap = new Map();
    try {
        for (var prevColumns_1 = tslib_1.__values(prevColumns), prevColumns_1_1 = prevColumns_1.next(); !prevColumns_1_1.done; prevColumns_1_1 = prevColumns_1.next()) {
            var column = prevColumns_1_1.value;
            keys.add(column.key);
            prevColumnsMap.set(column.key, column);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (prevColumns_1_1 && !prevColumns_1_1.done && (_a = prevColumns_1.return)) _a.call(prevColumns_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var nextColumns_1 = tslib_1.__values(nextColumns), nextColumns_1_1 = nextColumns_1.next(); !nextColumns_1_1.done; nextColumns_1_1 = nextColumns_1.next()) {
            var column = nextColumns_1_1.value;
            keys.add(column.key);
            nextColumnsMap.set(column.key, column);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (nextColumns_1_1 && !nextColumns_1_1.done && (_b = nextColumns_1.return)) _b.call(nextColumns_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    if (keys.size > prevColumnsMap.size)
        return false;
    try {
        for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            if (!prevColumnsMap.has(key) || !nextColumnsMap.has(key))
                return false;
            var prevColumn = prevColumnsMap.get(key);
            var nextColumn = nextColumnsMap.get(key);
            if (!isSameColumn(prevColumn, nextColumn))
                return false;
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_c = keys_1.return)) _c.call(keys_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return true;
}
function sameColumns(prevColumns, nextColumns, isSameColumn) {
    if (utils_1.isColumnsImmutable(prevColumns) && utils_1.isColumnsImmutable(nextColumns)) {
        return prevColumns === nextColumns;
    }
    return compareEachColumn(prevColumns, nextColumns, isSameColumn);
}
exports.sameColumns = sameColumns;
//# sourceMappingURL=ColumnMetrics.js.map