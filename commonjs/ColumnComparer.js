"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_is_1 = require("react-is");
function sameColumn(a, b) {
    for (var k in a) {
        if (a.hasOwnProperty(k)) {
            var valA = a[k];
            var valB = b[k];
            if ((typeof valA === 'function' && typeof valB === 'function') || (react_is_1.isElement(valA) && react_is_1.isElement(valB))) {
                continue;
            }
            if (!b.hasOwnProperty(k) || valA !== valB) {
                return false;
            }
        }
    }
    for (var k in b) {
        if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}
exports.sameColumn = sameColumn;
//# sourceMappingURL=ColumnComparer.js.map