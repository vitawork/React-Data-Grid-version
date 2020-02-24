export function getSize(columns) {
    if (Array.isArray(columns)) {
        return columns.length;
    }
    return columns.size;
}
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
export function canEdit(column, rowData, enableCellSelect) {
    if (typeof column.editable === 'function') {
        return enableCellSelect === true && column.editable(rowData);
    }
    return enableCellSelect === true && (!!column.editor || !!column.editable);
}
export function isFrozen(column) {
    return column.frozen === true;
}
//# sourceMappingURL=ColumnUtils.js.map