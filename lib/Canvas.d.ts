import React from 'react';
import { CalculatedColumn, Position, ScrollPosition, SubRowDetails, RowRenderer, RowRendererProps } from './common/types';
import { ViewportProps, ViewportState } from './Viewport';
declare type SharedViewportProps<R> = Pick<ViewportProps<R>, 'rowKey' | 'totalWidth' | 'rowGetter' | 'rowsCount' | 'selectedRows' | 'rowRenderer' | 'cellMetaData' | 'rowHeight' | 'scrollToRowIndex' | 'contextMenu' | 'rowSelection' | 'getSubRowDetails' | 'rowGroupRenderer' | 'enableCellSelect' | 'enableCellAutoFocus' | 'cellNavigationMode' | 'eventBus' | 'RowsContainer' | 'editorPortalTarget' | 'interactionMasksMetaData'>;
declare type SharedViewportState = Pick<ViewportState, 'rowOverscanStartIdx' | 'rowOverscanEndIdx' | 'rowVisibleStartIdx' | 'rowVisibleEndIdx' | 'colVisibleStartIdx' | 'colVisibleEndIdx' | 'colOverscanStartIdx' | 'colOverscanEndIdx' | 'lastFrozenColumnIndex' | 'height' | 'isScrolling'>;
export interface CanvasProps<R> extends SharedViewportProps<R>, SharedViewportState {
    columns: CalculatedColumn<R>[];
    width: number;
    totalColumnWidth: number;
    onScroll(position: ScrollPosition): void;
}
declare type RendererProps<R> = Pick<CanvasProps<R>, 'rowVisibleStartIdx' | 'rowVisibleEndIdx' | 'columns' | 'cellMetaData' | 'colVisibleStartIdx' | 'colVisibleEndIdx' | 'colOverscanEndIdx' | 'colOverscanStartIdx' | 'lastFrozenColumnIndex' | 'isScrolling'> & {
    ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
    key: number;
    idx: number;
    row: R;
    subRowDetails?: SubRowDetails;
    height: number;
    isSelected: boolean;
    scrollLeft: number;
};
export default class Canvas<R> extends React.PureComponent<CanvasProps<R>> {
    static displayName: string;
    private readonly canvas;
    private readonly interactionMasks;
    private readonly rows;
    private unsubscribeScrollToColumn;
    private _scroll;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: CanvasProps<R>): void;
    handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    onHitBottomCanvas: () => void;
    onHitTopCanvas: () => void;
    handleHitColummBoundary: ({ idx }: Position) => void;
    scrollToRow(scrollToRowIndex: number): void;
    scrollToColumn: (idx: number) => void;
    getRows(rowOverscanStartIdx: number, rowOverscanEndIdx: number): {
        row: R;
        subRowDetails: SubRowDetails<unknown> | undefined;
    }[];
    getScroll(): {
        scrollTop: number;
        scrollLeft: number;
    };
    getClientScrollTopOffset(node: HTMLDivElement): number;
    isRowSelected(idx: number, row: R): boolean;
    setScrollLeft(scrollLeft: number): void;
    getRowByRef: (i: number) => (RowRenderer<R> & React.Component<RowRendererProps<R>, {}, any>) | undefined;
    getRowTop: (rowIdx: number) => number;
    getRowHeight: (rowIdx: number) => number;
    getRowColumns: (rowIdx: number) => CalculatedColumn<R, unknown, keyof R>[];
    renderCustomRowRenderer(props: RendererProps<R>): JSX.Element;
    renderGroupRow(props: RendererProps<R>): JSX.Element;
    renderRow(props: RendererProps<R>): JSX.Element;
    renderPlaceholder(key: string, height: number): JSX.Element;
    render(): JSX.Element;
}
export {};
