import { SCROLL_DIRECTION } from '../common/enums';
import { CalculatedColumn, ColumnMetrics } from '../common/types';
export declare const OVERSCAN_ROWS = 2;
export declare function getGridState<R>(props: {
    columnMetrics: ColumnMetrics<R>;
    rowsCount: number;
    minHeight: number;
    rowHeight: number;
    rowOffsetHeight: number;
}): {
    rowOverscanStartIdx: number;
    rowOverscanEndIdx: number;
    rowVisibleStartIdx: number;
    rowVisibleEndIdx: number;
    height: number;
    scrollTop: number;
    scrollLeft: number;
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    isScrolling: boolean;
    lastFrozenColumnIndex: number;
};
export declare function findLastFrozenColumnIndex<R>(columns: CalculatedColumn<R>[]): number;
export declare function getNonFrozenVisibleColStartIdx<R>(columns: CalculatedColumn<R>[], scrollLeft: number): number;
export declare function getNonFrozenRenderedColumnCount<R>(columnMetrics: ColumnMetrics<R>, viewportDomWidth: number, scrollLeft: number): number;
export interface VisibleBoundaries {
    rowVisibleStartIdx: number;
    rowVisibleEndIdx: number;
}
export declare function getVisibleBoundaries(gridHeight: number, rowHeight: number, scrollTop: number, rowsCount: number): VisibleBoundaries;
interface ScrollState {
    scrollTop?: number;
    scrollLeft?: number;
}
export declare function getScrollDirection(lastScroll: ScrollState, scrollTop: number, scrollLeft: number): SCROLL_DIRECTION;
export declare function getRowOverscanStartIdx(scrollDirection: SCROLL_DIRECTION, rowVisibleStartIdx: number): number;
export declare function getRowOverscanEndIdx(scrollDirection: SCROLL_DIRECTION, rowVisibleEndIdx: number, rowsCount: number): number;
export declare function getColOverscanStartIdx(scrollDirection: SCROLL_DIRECTION, colVisibleStartIdx: number, lastFrozenColumnIdx: number): number;
export declare function getColOverscanEndIdx(scrollDirection: SCROLL_DIRECTION, colVisibleEndIdx: number, totalNumberColumns: number): number;
export {};
