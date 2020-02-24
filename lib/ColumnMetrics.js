import { __assign, __read, __spread, __values } from "tslib";
export { sameColumn } from './ColumnComparer';
import { getSize, isFrozen } from './ColumnUtils';
import getScrollbarSize from './getScrollbarSize';
import { isColumnsImmutable } from './common/utils';
function cloneColumns(columns) {
    if (Array.isArray(columns)) {
        return columns.map(function (c) { return (__assign({}, c)); });
    }
    return cloneColumns(columns.toArray());
}
function setColumnWidths(columns, totalWidth) {
    var e_1, _a;
    try {
        for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
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
        for (var columns_2 = __values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
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
        for (var _b = __values(columns), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export function recalculate(metrics) {
    // clone columns so we can safely edit them:
    var columns = cloneColumns(metrics.columns);
    // compute width for columns which specify width
    setColumnWidths(columns, metrics.totalWidth);
    var width = getTotalColumnWidth(columns);
    var unallocatedWidth = metrics.totalWidth - width - getScrollbarSize();
    // compute width for columns which doesn't specify width
    setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);
    // compute left offset
    setColumnOffsets(columns);
    var frozenColumns = columns.filter(function (c) { return isFrozen(c); });
    var nonFrozenColumns = columns.filter(function (c) { return !isFrozen(c); });
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
/**
 * Update column metrics calculation by resizing a column.
 */
export function resizeColumn(metrics, index, width) {
    var updatedColumn = __assign({}, metrics.columns[index]);
    updatedColumn.width = Math.max(width, metrics.minColumnWidth);
    var updatedMetrics = __assign({}, metrics);
    updatedMetrics.columns = __spread(metrics.columns);
    updatedMetrics.columns.splice(index, 1, updatedColumn);
    return recalculate(updatedMetrics);
}
function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
    var e_4, _a, e_5, _b, e_6, _c;
    if (getSize(prevColumns) !== getSize(nextColumns))
        return false;
    var keys = new Set();
    var prevColumnsMap = new Map();
    var nextColumnsMap = new Map();
    try {
        for (var prevColumns_1 = __values(prevColumns), prevColumns_1_1 = prevColumns_1.next(); !prevColumns_1_1.done; prevColumns_1_1 = prevColumns_1.next()) {
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
        for (var nextColumns_1 = __values(nextColumns), nextColumns_1_1 = nextColumns_1.next(); !nextColumns_1_1.done; nextColumns_1_1 = nextColumns_1.next()) {
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
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
export function sameColumns(prevColumns, nextColumns, isSameColumn) {
    if (isColumnsImmutable(prevColumns) && isColumnsImmutable(nextColumns)) {
        return prevColumns === nextColumns;
    }
    return compareEachColumn(prevColumns, nextColumns, isSameColumn);
}
//# sourceMappingURL=ColumnMetrics.js.map