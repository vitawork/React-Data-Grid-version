import React from 'react';
import { ColumnList } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';
export interface ToolbarProps<R> {
    columns: ColumnList<R>;
    rowsCount: number;
    onToggleFilter(): void;
}
declare type ToolbarContainerProps<R> = ToolbarProps<R> & Pick<ReactDataGridProps<R>, 'toolbar'>;
export default function ToolbarContainer<R>({ toolbar, columns, rowsCount, onToggleFilter }: ToolbarContainerProps<R>): React.ReactElement<ToolbarProps<R>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export {};
