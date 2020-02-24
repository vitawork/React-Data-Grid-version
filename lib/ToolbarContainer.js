import React from 'react';
import { isElement, isValidElementType } from 'react-is';
export default function ToolbarContainer(_a) {
    var toolbar = _a.toolbar, columns = _a.columns, rowsCount = _a.rowsCount, onToggleFilter = _a.onToggleFilter;
    if (!toolbar) {
        return null;
    }
    var toolBarProps = { columns: columns, onToggleFilter: onToggleFilter, rowsCount: rowsCount };
    if (isElement(toolbar)) {
        return React.cloneElement(toolbar, toolBarProps);
    }
    if (isValidElementType(toolbar)) {
        return React.createElement(toolbar, toolBarProps);
    }
    return null;
}
//# sourceMappingURL=ToolbarContainer.js.map