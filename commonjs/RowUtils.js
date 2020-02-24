"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(row, property) {
    if (typeof row.get === 'function') {
        return row.get(property);
    }
    return row[property];
}
exports.get = get;
function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
    if (Array.isArray(indexes) && typeof rowIdx === 'number') {
        return indexes.includes(rowIdx);
    }
    if (rowData && keys && keys.rowKey && Array.isArray(keys.values)) {
        return keys.values.includes(rowData[keys.rowKey]);
    }
    if (rowData && typeof isSelectedKey === 'string') {
        return !!rowData[isSelectedKey];
    }
    return false;
}
exports.isRowSelected = isRowSelected;
//# sourceMappingURL=RowUtils.js.map