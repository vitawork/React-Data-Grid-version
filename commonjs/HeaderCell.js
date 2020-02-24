"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_is_1 = require("react-is");
var ColumnUtils_1 = require("./ColumnUtils");
var enums_1 = require("./common/enums");
function SimpleCellRenderer(_a) {
    var column = _a.column, rowType = _a.rowType;
    var headerText = rowType === enums_1.HeaderRowType.HEADER ? column.name : '';
    return react_1.default.createElement("div", null, headerText);
}
var HeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderCell, _super);
    function HeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cell = react_1.default.createRef();
        _this.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            var right = event.currentTarget.getBoundingClientRect().right;
            var offset = right - event.clientX;
            if (offset > 11) { // +1px to account for the border size
                return;
            }
            var onMouseMove = function (event) {
                _this.onResize(event.clientX + offset);
            };
            var onMouseUp = function (event) {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                _this.onResizeEnd(event.clientX + offset);
            };
            event.preventDefault();
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        };
        _this.onTouchStart = function (event) {
            var touch = event.changedTouches[0];
            var identifier = touch.identifier;
            var right = event.currentTarget.getBoundingClientRect().right;
            var offset = right - touch.clientX;
            if (offset > 11) { // +1px to account for the border size
                return;
            }
            function getTouch(event) {
                var e_1, _a;
                try {
                    for (var _b = tslib_1.__values(event.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var touch_1 = _c.value;
                        if (touch_1.identifier === identifier)
                            return touch_1;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return null;
            }
            var onTouchMove = function (event) {
                var touch = getTouch(event);
                if (touch) {
                    _this.onResize(touch.clientX + offset);
                }
            };
            var onTouchEnd = function (event) {
                var touch = getTouch(event);
                if (!touch)
                    return;
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
                _this.onResizeEnd(touch.clientX + offset);
            };
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        };
        return _this;
    }
    HeaderCell.prototype.onResize = function (x) {
        var onResize = this.props.onResize;
        if (onResize) {
            var width = this.getWidthFromMouseEvent(x);
            if (width > 0) {
                onResize(this.props.column, width);
            }
        }
    };
    HeaderCell.prototype.onResizeEnd = function (x) {
        var width = this.getWidthFromMouseEvent(x);
        this.props.onResizeEnd(this.props.column, width);
    };
    HeaderCell.prototype.getWidthFromMouseEvent = function (x) {
        return x - this.cell.current.getBoundingClientRect().left;
    };
    HeaderCell.prototype.getCell = function () {
        var _a = this.props, height = _a.height, column = _a.column, rowType = _a.rowType;
        var renderer = this.props.renderer || SimpleCellRenderer;
        if (react_is_1.isElement(renderer)) {
            // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
            if (typeof renderer.type === 'string') {
                return react_1.default.cloneElement(renderer, { height: height });
            }
            return react_1.default.cloneElement(renderer, { column: column, height: height });
        }
        return react_1.default.createElement(renderer, { column: column, rowType: rowType });
    };
    HeaderCell.prototype.setScrollLeft = function (scrollLeft) {
        var node = this.cell.current;
        if (node) {
            node.style.transform = "translateX(" + scrollLeft + "px)";
        }
    };
    HeaderCell.prototype.removeScroll = function () {
        var node = this.cell.current;
        if (node) {
            node.style.transform = 'none';
        }
    };
    HeaderCell.prototype.render = function () {
        var _a = this.props, column = _a.column, rowType = _a.rowType, height = _a.height;
        var className = classnames_1.default('react-grid-HeaderCell', {
            'rdg-header-cell-resizable': column.resizable,
            'react-grid-HeaderCell--frozen': ColumnUtils_1.isFrozen(column)
        }, this.props.className, column.cellClass);
        var style = {
            width: column.width,
            left: column.left,
            height: height
        };
        var cell = (react_1.default.createElement("div", { className: className, style: style, ref: this.cell, onMouseDown: column.resizable ? this.onMouseDown : undefined, onTouchStart: column.resizable ? this.onTouchStart : undefined }, this.getCell()));
        var DraggableHeaderCell = this.props.draggableHeaderCell;
        if (rowType === enums_1.HeaderRowType.HEADER && column.draggable && DraggableHeaderCell) {
            return (react_1.default.createElement(DraggableHeaderCell, { column: column, onHeaderDrop: this.props.onHeaderDrop }, cell));
        }
        return cell;
    };
    return HeaderCell;
}(react_1.default.Component));
exports.default = HeaderCell;
//# sourceMappingURL=HeaderCell.js.map