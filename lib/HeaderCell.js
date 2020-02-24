import { __extends, __values } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { isElement } from 'react-is';
import { isFrozen } from './ColumnUtils';
import { HeaderRowType } from './common/enums';
function SimpleCellRenderer(_a) {
    var column = _a.column, rowType = _a.rowType;
    var headerText = rowType === HeaderRowType.HEADER ? column.name : '';
    return React.createElement("div", null, headerText);
}
var HeaderCell = /** @class */ (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cell = React.createRef();
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
                    for (var _b = __values(event.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        if (isElement(renderer)) {
            // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
            if (typeof renderer.type === 'string') {
                return React.cloneElement(renderer, { height: height });
            }
            return React.cloneElement(renderer, { column: column, height: height });
        }
        return React.createElement(renderer, { column: column, rowType: rowType });
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
        var className = classNames('react-grid-HeaderCell', {
            'rdg-header-cell-resizable': column.resizable,
            'react-grid-HeaderCell--frozen': isFrozen(column)
        }, this.props.className, column.cellClass);
        var style = {
            width: column.width,
            left: column.left,
            height: height
        };
        var cell = (React.createElement("div", { className: className, style: style, ref: this.cell, onMouseDown: column.resizable ? this.onMouseDown : undefined, onTouchStart: column.resizable ? this.onTouchStart : undefined }, this.getCell()));
        var DraggableHeaderCell = this.props.draggableHeaderCell;
        if (rowType === HeaderRowType.HEADER && column.draggable && DraggableHeaderCell) {
            return (React.createElement(DraggableHeaderCell, { column: column, onHeaderDrop: this.props.onHeaderDrop }, cell));
        }
        return cell;
    };
    return HeaderCell;
}(React.Component));
export default HeaderCell;
//# sourceMappingURL=HeaderCell.js.map