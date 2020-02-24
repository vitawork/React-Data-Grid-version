"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_is_1 = require("react-is");
var enums_1 = require("../../enums");
var SORT_TEXT = (_a = {},
    _a[enums_1.DEFINE_SORT.ASC] = '\u25B2',
    _a[enums_1.DEFINE_SORT.DESC] = '\u25BC',
    _a[enums_1.DEFINE_SORT.NONE] = '',
    _a);
function SortableHeaderCell(props) {
    var column = props.column, rowType = props.rowType, onSort = props.onSort, sortDirection = props.sortDirection, sortDescendingFirst = props.sortDescendingFirst;
    function onClick() {
        var direction;
        switch (sortDirection) {
            case enums_1.DEFINE_SORT.ASC:
                direction = sortDescendingFirst ? enums_1.DEFINE_SORT.NONE : enums_1.DEFINE_SORT.DESC;
                break;
            case enums_1.DEFINE_SORT.DESC:
                direction = sortDescendingFirst ? enums_1.DEFINE_SORT.ASC : enums_1.DEFINE_SORT.NONE;
                break;
            default:
                direction = sortDescendingFirst ? enums_1.DEFINE_SORT.DESC : enums_1.DEFINE_SORT.ASC;
                break;
        }
        onSort(column.key, direction);
    }
    var headerRenderer = column.headerRenderer;
    var content = !headerRenderer
        ? column.name
        : react_is_1.isElement(headerRenderer)
            ? react_1.default.cloneElement(headerRenderer, { column: column })
            : react_1.default.createElement(headerRenderer, { column: column, rowType: rowType });
    return (react_1.default.createElement("div", { className: "rdg-sortable-header-cell", onClick: onClick },
        react_1.default.createElement("span", { className: "pull-right" }, SORT_TEXT[sortDirection]),
        content));
}
exports.default = SortableHeaderCell;
//# sourceMappingURL=SortableHeaderCell.js.map