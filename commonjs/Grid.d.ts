import React from 'react';
import { ScrollState } from './Viewport';
import { HeaderRowData, CellMetaData, RowSelection, InteractionMasksMetaData, SelectedRow } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { DataGridProps, DataGridState } from './ReactDataGrid';
import { EventBus } from './masks';
declare type SharedDataGridProps<R> = Pick<DataGridProps<R>, 'rowKey' | 'draggableHeaderCell' | 'getValidFilterValues' | 'rowGetter' | 'rowsCount' | 'rowHeight' | 'rowRenderer' | 'rowGroupRenderer' | 'minHeight' | 'scrollToRowIndex' | 'contextMenu' | 'enableCellSelect' | 'enableCellAutoFocus' | 'cellNavigationMode' | 'onScroll' | 'RowsContainer' | 'emptyRowsView' | 'onHeaderDrop' | 'getSubRowDetails' | 'editorPortalTarget'>;
declare type SharedDataGridState<R> = Pick<DataGridState<R>, 'columnMetrics' | 'sortColumn' | 'sortDirection'>;
export interface GridProps<R> extends SharedDataGridProps<R>, SharedDataGridState<R> {
    headerRows: HeaderRowData<R>[];
    cellMetaData: CellMetaData<R>;
    selectedRows?: SelectedRow<R>[];
    rowSelection?: RowSelection;
    rowOffsetHeight: number;
    onSort(columnKey: keyof R, sortDirection: DEFINE_SORT): void;
    totalWidth: number | string;
    onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
    onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
    onColumnResize(idx: number, width: number): void;
    eventBus: EventBus;
    interactionMasksMetaData: InteractionMasksMetaData<R>;
}
export default class Grid<R> extends React.Component<GridProps<R>> {
    static displayName: string;
    private readonly header;
    private readonly viewport;
    private _scrollLeft?;
    _onScroll(): void;
    areFrozenColumnsScrolledLeft(scrollLeft: number): boolean;
    onScroll: (scrollState: ScrollState) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
