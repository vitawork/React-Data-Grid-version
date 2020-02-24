import React, { forwardRef } from 'react';
export var SelectAll = forwardRef(function SelectAll(_a, ref) {
    var onChange = _a.onChange;
    return (React.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
        React.createElement("input", { type: "checkbox", className: "react-grid-checkbox", ref: ref, onChange: onChange }),
        React.createElement("span", { className: "react-grid-checkbox-label" })));
});
//# sourceMappingURL=SelectAll.js.map