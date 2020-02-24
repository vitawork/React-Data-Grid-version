"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_dom_1 = tslib_1.__importDefault(require("react-dom"));
function EditorPortal(_a) {
    var target = _a.target, children = _a.children;
    // Keep track of when the modal element is added to the DOM
    var _b = tslib_1.__read(react_1.useState(false), 2), isMounted = _b[0], setIsMounted = _b[1];
    react_1.useLayoutEffect(function () {
        setIsMounted(true);
    }, []);
    // Don't render the portal until the component has mounted,
    // So the portal can safely access the DOM.
    if (!isMounted) {
        return null;
    }
    return react_dom_1.default.createPortal(children, target);
}
exports.default = EditorPortal;
//# sourceMappingURL=EditorPortal.js.map