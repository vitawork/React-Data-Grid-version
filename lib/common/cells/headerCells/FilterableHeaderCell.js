import { __read } from "tslib";
import React, { useState } from 'react';
export default function FilterableHeaderCell(_a) {
    var column = _a.column, onChange = _a.onChange;
    var _b = __read(useState(''), 2), filterTerm = _b[0], setFilterTerm = _b[1];
    function handleChange(event) {
        var value = event.target.value;
        setFilterTerm(value);
        if (onChange) {
            onChange({ filterTerm: value, column: column });
        }
    }
    if (column.filterable === false) {
        return React.createElement("div", null);
    }
    return (React.createElement("div", { className: "form-group" },
        React.createElement("input", { key: "header-filter-" + column.key, className: "form-control input-sm", placeholder: "Search", value: filterTerm, onChange: handleChange })));
}
//# sourceMappingURL=FilterableHeaderCell.js.map