import React from 'react';
export default function CheckboxEditor(_a) {
    var value = _a.value, rowIdx = _a.rowIdx, column = _a.column, dependentValues = _a.dependentValues;
    function handleChange(event) {
        if (column.onCellChange) {
            column.onCellChange(rowIdx, column.key, dependentValues, event);
        }
    }
    return (React.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
        React.createElement("input", { type: "checkbox", className: "react-grid-checkbox", onChange: handleChange, checked: value === true }),
        React.createElement("span", { className: "react-grid-checkbox-label" })));
}
//# sourceMappingURL=CheckboxEditor.js.map