import { __assign } from "tslib";
import React from 'react';
import { isElement, isValidElementType } from 'react-is';
import { SimpleCellFormatter } from '../formatters';
export default function CellValue(_a) {
    var rowIdx = _a.rowIdx, rowData = _a.rowData, column = _a.column, value = _a.value, isScrolling = _a.isScrolling;
    function getFormatterDependencies(row) {
        // convention based method to get corresponding Id or Name of any Name or Id property
        var getRowMetaData = column.getRowMetaData;
        if (getRowMetaData) {
            if (process.env.NODE_ENV === 'development') {
                console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
            }
            return getRowMetaData(row, column);
        }
    }
    function getFormatterProps() {
        return {
            value: value,
            column: column,
            rowIdx: rowIdx,
            isScrolling: isScrolling,
            row: rowData,
            dependentValues: getFormatterDependencies(rowData)
        };
    }
    var formatter = column.formatter;
    if (isElement(formatter)) {
        return React.cloneElement(formatter, getFormatterProps());
    }
    if (isValidElementType(formatter)) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return React.createElement(formatter, __assign(__assign({}, getFormatterProps()), { value: value })); //FIXME: fix value type
    }
    return React.createElement(SimpleCellFormatter, { value: value });
}
//# sourceMappingURL=CellValue.js.map