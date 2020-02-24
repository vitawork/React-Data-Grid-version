"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
function ClickOutside(_a) {
    var onClickOutside = _a.onClickOutside, children = _a.children;
    var isClickedInside = react_1.useRef(false);
    react_1.useEffect(function () {
        function handleDocumentClick() {
            if (isClickedInside.current) {
                isClickedInside.current = false;
            }
            else {
                onClickOutside();
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return function () {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [onClickOutside]);
    return react_1.default.cloneElement(react_1.default.Children.only(children), {
        onClickCapture: function () {
            isClickedInside.current = true;
        }
    });
}
exports.default = ClickOutside;
//# sourceMappingURL=ClickOutside.js.map