"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
function FilterableHeaderCell(_a) {
    var column = _a.column, onChange = _a.onChange;
    var _b = tslib_1.__read(react_1.useState(''), 2), filterTerm = _b[0], setFilterTerm = _b[1];
    function handleChange(event) {
        var value = event.target.value;
        setFilterTerm(value);
        if (onChange) {
            onChange({ filterTerm: value, column: column });
        }
    }
    if (column.filterable === false) {
        return react_1.default.createElement("div", null);
    }
    return (react_1.default.createElement("div", { className: "form-group" },
        react_1.default.createElement("input", { key: "header-filter-" + column.key, className: "form-control input-sm", placeholder: "Search", value: filterTerm, onChange: handleChange })));
}
exports.default = FilterableHeaderCell;
//# sourceMappingURL=FilterableHeaderCell.js.map