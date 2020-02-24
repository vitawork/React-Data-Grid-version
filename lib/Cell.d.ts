import React from 'react';
import { CellRenderer, CellRendererProps } from './common/types';
export interface Props<R> extends CellRendererProps<R> {
    className?: string;
    tooltip?: string | null;
    cellControls?: unknown;
}
export default class Cell<R> extends React.PureComponent<Props<R>> implements CellRenderer {
    static defaultProps: {
        value: string;
    };
    private readonly cell;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props<R>): void;
    handleCellClick: () => void;
    handleCellMouseDown: () => void;
    handleCellMouseEnter: () => void;
    handleCellContextMenu: () => void;
    handleCellDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleCellExpand: () => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    getStyle(): React.CSSProperties;
    getCellClass(): string;
    checkScroll(): void;
    setScrollLeft(scrollLeft: number): void;
    removeScroll(): void;
    getEvents(): {
        [key: string]: Function;
    };
    render(): JSX.Element | null;
}
