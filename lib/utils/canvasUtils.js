import { isFrozen } from '../ColumnUtils';
export function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
    var left = 0;
    var frozen = 0;
    for (var i = 0; i < idx; i++) {
        var column = columns[i];
        if (column) {
            if (column.width) {
                left += column.width;
            }
            if (isFrozen(column)) {
                frozen += column.width;
            }
        }
    }
    var selectedColumn = columns[idx];
    if (selectedColumn) {
        var scrollLeft = left - frozen - currentScrollLeft;
        var scrollRight = left + selectedColumn.width - currentScrollLeft;
        if (scrollLeft < 0) {
            return scrollLeft;
        }
        if (scrollRight > currentClientWidth) {
            return scrollRight - currentClientWidth;
        }
    }
    return 0;
}
//# sourceMappingURL=canvasUtils.js.map