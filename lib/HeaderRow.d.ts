import React from 'react';
import { HeaderRowType, HeaderCellType } from './common/enums';
import { CalculatedColumn, AddFilterEvent } from './common/types';
import { HeaderProps } from './Header';
declare type SharedHeaderProps<R> = Pick<HeaderProps<R>, 'draggableHeaderCell' | 'onHeaderDrop' | 'sortColumn' | 'sortDirection' | 'onSort' | 'getValidFilterValues'>;
export interface HeaderRowProps<R> extends SharedHeaderProps<R> {
    width?: number;
    height: number;
    columns: CalculatedColumn<R>[];
    onColumnResize(column: CalculatedColumn<R>, width: number): void;
    onColumnResizeEnd(column: CalculatedColumn<R>, width: number): void;
    style?: React.CSSProperties;
    filterable?: boolean;
    onFilterChange?(args: AddFilterEvent<R>): void;
    rowType: HeaderRowType;
}
export default class HeaderRow<R> extends React.Component<HeaderRowProps<R>> {
    static displayName: string;
    private readonly cells;
    shouldComponentUpdate(nextProps: HeaderRowProps<R>): boolean;
    getHeaderCellType(column: CalculatedColumn<R>): HeaderCellType;
    getFilterableHeaderCell(column: CalculatedColumn<R>): JSX.Element;
    getSortableHeaderCell(column: CalculatedColumn<R>): JSX.Element;
    getHeaderRenderer(column: CalculatedColumn<R>): JSX.Element | React.ComponentClass<import("./common/types").HeaderRowProps<R>, any> | React.FunctionComponent<import("./common/types").HeaderRowProps<R>> | undefined;
    getCells(): JSX.Element[];
    setScrollLeft(scrollLeft: number): void;
    render(): JSX.Element;
}
export {};
