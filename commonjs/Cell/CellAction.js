"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
function CellAction(_a) {
    var icon = _a.icon, actions = _a.actions, callback = _a.callback, isFirst = _a.isFirst;
    var _b = tslib_1.__read(react_1.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var cellActionClasses = classnames_1.default('rdg-cell-action', {
        'rdg-cell-action-last': isFirst
    });
    var actionButtonClasses = classnames_1.default('rdg-cell-action-button', {
        'rdg-cell-action-button-toggled': isOpen
    });
    function onActionIconClick() {
        if (typeof callback === 'function') {
            callback();
        }
        if (actions && actions.length > 0) {
            setIsOpen(!isOpen);
        }
    }
    return (react_1.default.createElement("div", { className: cellActionClasses, onMouseLeave: function () { return setIsOpen(false); } },
        react_1.default.createElement("div", { className: actionButtonClasses, onClick: onActionIconClick }, icon),
        isOpen && actions && actions.length && (react_1.default.createElement("div", { className: "rdg-cell-action-menu" }, actions.map(function (action, index) { return react_1.default.createElement("span", { key: index, onClick: action.callback }, action.text); })))));
}
exports.default = CellAction;
//# sourceMappingURL=CellAction.js.map