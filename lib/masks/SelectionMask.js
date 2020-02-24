import { __assign } from "tslib";
import React, { forwardRef } from 'react';
import CellMask from './CellMask';
var SelectionMask = forwardRef(function SelectionMask(props, ref) {
    return (React.createElement(CellMask, __assign({}, props, { className: "rdg-selected", ref: ref, tabIndex: 0 })));
});
export default SelectionMask;
//# sourceMappingURL=SelectionMask.js.map