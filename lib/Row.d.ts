import React from 'react';
import Cell from './Cell';
import { RowRenderer, RowRendererProps, CalculatedColumn } from './common/types';
export default class Row<R> extends React.Component<RowRendererProps<R>> implements RowRenderer<R> {
    static displayName: string;
    static defaultProps: {
        cellRenderer: typeof Cell;
        isSelected: boolean;
        height: number;
    };
    private readonly row;
    private readonly cells;
    shouldComponentUpdate(nextProps: RowRendererProps<R>): boolean;
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    getCell(column: CalculatedColumn<R>): JSX.Element;
    getCells(): JSX.Element[];
    getRowTop(): number;
    getRowHeight(): number;
    getCellValue(key: keyof R): boolean | R[keyof R] | undefined;
    getExpandableOptions(columnKey: keyof R): {
        canExpand: boolean;
        field: string;
        expanded: boolean;
        children: unknown[];
        treeDepth: number;
        subRowDetails: import("./common/types").SubRowDetails<unknown>;
    } | undefined;
    setScrollLeft(scrollLeft: number): void;
    render(): JSX.Element;
}
