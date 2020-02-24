import React from 'react';
import { CalculatedColumn, ColumnMetrics } from './common/types';
import { GridProps } from './Grid';
declare type SharedGridProps<R> = Pick<GridProps<R>, 'columnMetrics' | 'onColumnResize' | 'rowHeight' | 'totalWidth' | 'headerRows' | 'sortColumn' | 'sortDirection' | 'draggableHeaderCell' | 'onSort' | 'onHeaderDrop' | 'getValidFilterValues' | 'cellMetaData'>;
export declare type HeaderProps<R> = SharedGridProps<R>;
interface State<R> {
    resizing: {
        column: CalculatedColumn<R>;
        columnMetrics: ColumnMetrics<R>;
    } | null;
}
export default class Header<R> extends React.Component<HeaderProps<R>, State<R>> {
    readonly state: Readonly<State<R>>;
    private readonly row;
    private readonly filterRow;
    componentWillReceiveProps(): void;
    onColumnResize: (column: CalculatedColumn<R, unknown, keyof R>, width: number) => void;
    onColumnResizeEnd: (column: CalculatedColumn<R, unknown, keyof R>, width: number) => void;
    getHeaderRows(): JSX.Element[];
    getColumnMetrics(): ColumnMetrics<R>;
    getColumnPosition(column: CalculatedColumn<R>): number | null;
    getCombinedHeaderHeights(until?: number): number;
    setScrollLeft(scrollLeft: number): void;
    onHeaderClick: () => void;
    render(): JSX.Element;
}
export {};
