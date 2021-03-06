"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Canvas_1 = tslib_1.__importDefault(require("./Canvas"));
var viewportUtils_1 = require("./utils/viewportUtils");
var Viewport = /** @class */ (function (_super) {
    tslib_1.__extends(Viewport, _super);
    function Viewport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = viewportUtils_1.getGridState(_this.props);
        _this.canvas = react_1.default.createRef();
        _this.viewport = react_1.default.createRef();
        _this.resetScrollStateTimeoutId = null;
        _this.onScroll = function (_a) {
            var scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
            var _b = _this.props, rowHeight = _b.rowHeight, rowsCount = _b.rowsCount, onScroll = _b.onScroll;
            var nextScrollState = _this.updateScroll({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft,
                height: _this.state.height,
                rowHeight: rowHeight,
                rowsCount: rowsCount
            });
            onScroll(nextScrollState);
        };
        _this.resetScrollStateAfterDelayCallback = function () {
            _this.resetScrollStateTimeoutId = null;
            _this.setState({ isScrolling: false });
        };
        _this.metricsUpdated = function () {
            if (!_this.viewport.current) {
                return;
            }
            var height = _this.viewport.current.getBoundingClientRect().height;
            if (height) {
                var _a = _this.state, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
                var _b = _this.props, rowHeight = _b.rowHeight, rowsCount = _b.rowsCount;
                _this.updateScroll({
                    scrollTop: scrollTop,
                    scrollLeft: scrollLeft,
                    height: height,
                    rowHeight: rowHeight,
                    rowsCount: rowsCount
                });
            }
        };
        return _this;
    }
    Viewport.prototype.getScroll = function () {
        return this.canvas.current.getScroll();
    };
    Viewport.prototype.setScrollLeft = function (scrollLeft) {
        this.canvas.current.setScrollLeft(scrollLeft);
    };
    Viewport.prototype.getDOMNodeOffsetWidth = function () {
        return this.viewport.current ? this.viewport.current.offsetWidth : 0;
    };
    Viewport.prototype.clearScrollTimer = function () {
        if (this.resetScrollStateTimeoutId !== null) {
            window.clearTimeout(this.resetScrollStateTimeoutId);
        }
    };
    Viewport.prototype.getNextScrollState = function (_a) {
        var scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft, height = _a.height, rowHeight = _a.rowHeight, rowsCount = _a.rowsCount;
        var isScrolling = true;
        var columns = this.props.columnMetrics.columns;
        var scrollDirection = viewportUtils_1.getScrollDirection(this.state, scrollTop, scrollLeft);
        var _b = viewportUtils_1.getVisibleBoundaries(height, rowHeight, scrollTop, rowsCount), rowVisibleStartIdx = _b.rowVisibleStartIdx, rowVisibleEndIdx = _b.rowVisibleEndIdx;
        var rowOverscanStartIdx = viewportUtils_1.getRowOverscanStartIdx(scrollDirection, rowVisibleStartIdx);
        var rowOverscanEndIdx = viewportUtils_1.getRowOverscanEndIdx(scrollDirection, rowVisibleEndIdx, rowsCount);
        var totalNumberColumns = columns.length;
        var lastFrozenColumnIndex = viewportUtils_1.findLastFrozenColumnIndex(columns);
        var nonFrozenColVisibleStartIdx = viewportUtils_1.getNonFrozenVisibleColStartIdx(columns, scrollLeft);
        var nonFrozenRenderedColumnCount = viewportUtils_1.getNonFrozenRenderedColumnCount(this.props.columnMetrics, this.getDOMNodeOffsetWidth(), scrollLeft);
        var colVisibleEndIdx = Math.min(nonFrozenColVisibleStartIdx + nonFrozenRenderedColumnCount, totalNumberColumns);
        var colOverscanStartIdx = viewportUtils_1.getColOverscanStartIdx(scrollDirection, nonFrozenColVisibleStartIdx, lastFrozenColumnIndex);
        var colOverscanEndIdx = viewportUtils_1.getColOverscanEndIdx(scrollDirection, colVisibleEndIdx, totalNumberColumns);
        return {
            height: height,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            rowVisibleStartIdx: rowVisibleStartIdx,
            rowVisibleEndIdx: rowVisibleEndIdx,
            rowOverscanStartIdx: rowOverscanStartIdx,
            rowOverscanEndIdx: rowOverscanEndIdx,
            colVisibleStartIdx: nonFrozenColVisibleStartIdx,
            colVisibleEndIdx: colVisibleEndIdx,
            colOverscanStartIdx: colOverscanStartIdx,
            colOverscanEndIdx: colOverscanEndIdx,
            scrollDirection: scrollDirection,
            lastFrozenColumnIndex: lastFrozenColumnIndex,
            isScrolling: isScrolling
        };
    };
    Viewport.prototype.resetScrollStateAfterDelay = function () {
        this.clearScrollTimer();
        this.resetScrollStateTimeoutId = window.setTimeout(this.resetScrollStateAfterDelayCallback, 500);
    };
    Viewport.prototype.updateScroll = function (scrollParams) {
        this.resetScrollStateAfterDelay();
        var nextScrollState = this.getNextScrollState(scrollParams);
        this.setState(nextScrollState);
        return nextScrollState;
    };
    Viewport.prototype.componentWillReceiveProps = function (nextProps) {
        var rowHeight = nextProps.rowHeight, rowsCount = nextProps.rowsCount;
        if (this.props.rowHeight !== nextProps.rowHeight
            || this.props.minHeight !== nextProps.minHeight) {
            var _a = viewportUtils_1.getGridState(nextProps), scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft, height = _a.height;
            this.updateScroll({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft,
                height: height,
                rowHeight: rowHeight,
                rowsCount: rowsCount
            });
        }
        else if (this.props.columnMetrics.columns.length !== nextProps.columnMetrics.columns.length) {
            this.setState(viewportUtils_1.getGridState(nextProps));
        }
        else if (this.props.rowsCount !== nextProps.rowsCount) {
            var _b = this.state, scrollTop = _b.scrollTop, scrollLeft = _b.scrollLeft, height = _b.height;
            this.updateScroll({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft,
                height: height,
                rowHeight: rowHeight,
                rowsCount: rowsCount
            });
            // Added to fix the hiding of the bottom scrollbar when showing the filters.
        }
        else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
            var _c = this.state, scrollTop = _c.scrollTop, scrollLeft = _c.scrollLeft;
            // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
            var height = this.state.height + this.props.rowOffsetHeight - nextProps.rowOffsetHeight;
            this.updateScroll({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft,
                height: height,
                rowHeight: rowHeight,
                rowsCount: rowsCount
            });
        }
    };
    Viewport.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.metricsUpdated);
        this.metricsUpdated();
    };
    Viewport.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.metricsUpdated);
        this.clearScrollTimer();
    };
    Viewport.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "rdg-viewport", style: { top: this.props.rowOffsetHeight }, ref: this.viewport },
            react_1.default.createElement(Canvas_1.default, { ref: this.canvas, rowKey: this.props.rowKey, totalWidth: this.props.totalWidth, width: this.props.columnMetrics.width, totalColumnWidth: this.props.columnMetrics.totalColumnWidth, rowGetter: this.props.rowGetter, rowsCount: this.props.rowsCount, selectedRows: this.props.selectedRows, columns: this.props.columnMetrics.columns, rowRenderer: this.props.rowRenderer, rowOverscanStartIdx: this.state.rowOverscanStartIdx, rowOverscanEndIdx: this.state.rowOverscanEndIdx, rowVisibleStartIdx: this.state.rowVisibleStartIdx, rowVisibleEndIdx: this.state.rowVisibleEndIdx, colVisibleStartIdx: this.state.colVisibleStartIdx, colVisibleEndIdx: this.state.colVisibleEndIdx, colOverscanStartIdx: this.state.colOverscanStartIdx, colOverscanEndIdx: this.state.colOverscanEndIdx, lastFrozenColumnIndex: this.state.lastFrozenColumnIndex, cellMetaData: this.props.cellMetaData, height: this.state.height, rowHeight: this.props.rowHeight, onScroll: this.onScroll, scrollToRowIndex: this.props.scrollToRowIndex, contextMenu: this.props.contextMenu, rowSelection: this.props.rowSelection, getSubRowDetails: this.props.getSubRowDetails, rowGroupRenderer: this.props.rowGroupRenderer, isScrolling: this.state.isScrolling, enableCellSelect: this.props.enableCellSelect, enableCellAutoFocus: this.props.enableCellAutoFocus, cellNavigationMode: this.props.cellNavigationMode, eventBus: this.props.eventBus, RowsContainer: this.props.RowsContainer, editorPortalTarget: this.props.editorPortalTarget, interactionMasksMetaData: this.props.interactionMasksMetaData })));
    };
    Viewport.displayName = 'Viewport';
    return Viewport;
}(react_1.default.Component));
exports.default = Viewport;
//# sourceMappingURL=Viewport.js.map