"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_is_1 = require("react-is");
var formatters_1 = require("../formatters");
function CellValue(_a) {
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
    if (react_is_1.isElement(formatter)) {
        return react_1.default.cloneElement(formatter, getFormatterProps());
    }
    if (react_is_1.isValidElementType(formatter)) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return react_1.default.createElement(formatter, tslib_1.__assign(tslib_1.__assign({}, getFormatterProps()), { value: value })); //FIXME: fix value type
    }
    return react_1.default.createElement(formatters_1.SimpleCellFormatter, { value: value });
}
exports.default = CellValue;
//# sourceMappingURL=CellValue.js.map