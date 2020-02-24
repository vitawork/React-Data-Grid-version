import React from 'react';
import { GridProps } from './Grid';
import { ScrollPosition } from './common/types';
import { SCROLL_DIRECTION } from './common/enums';
interface ScrollParams {
    height: number;
    scrollTop: number;
    scrollLeft: number;
    rowsCount: number;
    rowHeight: number;
}
export interface ScrollState {
    height: number;
    scrollTop: number;
    scrollLeft: number;
    rowVisibleStartIdx: number;
    rowVisibleEndIdx: number;
    rowOverscanStartIdx: number;
    rowOverscanEndIdx: number;
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    scrollDirection: SCROLL_DIRECTION;
    lastFrozenColumnIndex: number;
    isScrolling: boolean;
}
declare type SharedGridProps<R> = Pick<GridProps<R>, 'rowKey' | 'rowHeight' | 'rowRenderer' | 'rowGetter' | 'rowsCount' | 'selectedRows' | 'columnMetrics' | 'totalWidth' | 'cellMetaData' | 'rowOffsetHeight' | 'minHeight' | 'scrollToRowIndex' | 'contextMenu' | 'rowSelection' | 'getSubRowDetails' | 'rowGroupRenderer' | 'enableCellSelect' | 'enableCellAutoFocus' | 'cellNavigationMode' | 'eventBus' | 'interactionMasksMetaData' | 'RowsContainer' | 'editorPortalTarget'>;
export interface ViewportProps<R> extends SharedGridProps<R> {
    onScroll(scrollState: ScrollState): void;
}
export interface ViewportState {
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
}
export default class Viewport<R> extends React.Component<ViewportProps<R>, ViewportState> {
    static displayName: string;
    readonly state: Readonly<ViewportState>;
    private readonly canvas;
    private readonly viewport;
    private resetScrollStateTimeoutId;
    onScroll: ({ scrollTop, scrollLeft }: ScrollPosition) => void;
    getScroll(): {
        scrollTop: number;
        scrollLeft: number;
    };
    setScrollLeft(scrollLeft: number): void;
    getDOMNodeOffsetWidth(): number;
    clearScrollTimer(): void;
    getNextScrollState({ scrollTop, scrollLeft, height, rowHeight, rowsCount }: ScrollParams): ScrollState;
    resetScrollStateAfterDelay(): void;
    resetScrollStateAfterDelayCallback: () => void;
    updateScroll(scrollParams: ScrollParams): ScrollState;
    metricsUpdated: () => void;
    componentWillReceiveProps(nextProps: ViewportProps<R>): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
