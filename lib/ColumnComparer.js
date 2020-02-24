import { isElement } from 'react-is';
export function sameColumn(a, b) {
    for (var k in a) {
        if (a.hasOwnProperty(k)) {
            var valA = a[k];
            var valB = b[k];
            if ((typeof valA === 'function' && typeof valB === 'function') || (isElement(valA) && isElement(valB))) {
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
//# sourceMappingURL=ColumnComparer.js.map