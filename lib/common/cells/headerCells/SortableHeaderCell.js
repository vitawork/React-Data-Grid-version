var _a;
import React from 'react';
import { isElement } from 'react-is';
import { DEFINE_SORT } from '../../enums';
var SORT_TEXT = (_a = {},
    _a[DEFINE_SORT.ASC] = '\u25B2',
    _a[DEFINE_SORT.DESC] = '\u25BC',
    _a[DEFINE_SORT.NONE] = '',
    _a);
export default function SortableHeaderCell(props) {
    var column = props.column, rowType = props.rowType, onSort = props.onSort, sortDirection = props.sortDirection, sortDescendingFirst = props.sortDescendingFirst;
    function onClick() {
        var direction;
        switch (sortDirection) {
            case DEFINE_SORT.ASC:
                direction = sortDescendingFirst ? DEFINE_SORT.NONE : DEFINE_SORT.DESC;
                break;
            case DEFINE_SORT.DESC:
                direction = sortDescendingFirst ? DEFINE_SORT.ASC : DEFINE_SORT.NONE;
                break;
            default:
                direction = sortDescendingFirst ? DEFINE_SORT.DESC : DEFINE_SORT.ASC;
                break;
        }
        onSort(column.key, direction);
    }
    var headerRenderer = column.headerRenderer;
    var content = !headerRenderer
        ? column.name
        : isElement(headerRenderer)
            ? React.cloneElement(headerRenderer, { column: column })
            : React.createElement(headerRenderer, { column: column, rowType: rowType });
    return (React.createElement("div", { className: "rdg-sortable-header-cell", onClick: onClick },
        React.createElement("span", { className: "pull-right" }, SORT_TEXT[sortDirection]),
        content));
}
//# sourceMappingURL=SortableHeaderCell.js.map