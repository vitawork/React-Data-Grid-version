"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CellAction_1 = tslib_1.__importDefault(require("./CellAction"));
function CellActions(_a) {
    var cellMetaData = _a.cellMetaData, column = _a.column, rowData = _a.rowData;
    if (cellMetaData.getCellActions) {
        var cellActionButtons = cellMetaData.getCellActions(column, rowData);
        if (cellActionButtons && cellActionButtons.length > 0) {
            var actionButtons = cellActionButtons.map(function (action, index) {
                return react_1.default.createElement(CellAction_1.default, tslib_1.__assign({ key: index, isFirst: index === 0 }, action));
            });
            return react_1.default.createElement(react_1.default.Fragment, null, actionButtons);
        }
    }
    return null;
}
exports.default = CellActions;
//# sourceMappingURL=CellActions.js.map