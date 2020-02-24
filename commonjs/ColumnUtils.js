"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSize(columns) {
    if (Array.isArray(columns)) {
        return columns.length;
    }
    return columns.size;
}
exports.getSize = getSize;
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
function canEdit(column, rowData, enableCellSelect) {
    if (typeof column.editable === 'function') {
        return enableCellSelect === true && column.editable(rowData);
    }
    return enableCellSelect === true && (!!column.editor || !!column.editable);
}
exports.canEdit = canEdit;
function isFrozen(column) {
    return column.frozen === true;
}
exports.isFrozen = isFrozen;
//# sourceMappingURL=ColumnUtils.js.map