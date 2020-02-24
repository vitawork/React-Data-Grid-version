export { sameColumn } from './ColumnComparer';
import { Column, ColumnList, ColumnMetrics } from './common/types';
declare type Metrics<R> = Pick<ColumnMetrics<R>, 'totalWidth' | 'minColumnWidth'> & {
    columns: ColumnList<R>;
};
export declare function recalculate<R>(metrics: Metrics<R>): ColumnMetrics<R>;
/**
 * Update column metrics calculation by resizing a column.
 */
export declare function resizeColumn<R>(metrics: ColumnMetrics<R>, index: number, width: number): ColumnMetrics<R>;
declare type ColumnComparer<R> = (colA: Column<R>, colB: Column<R>) => boolean;
export declare function sameColumns<R>(prevColumns: ColumnList<R>, nextColumns: ColumnList<R>, isSameColumn: ColumnComparer<R>): boolean;
