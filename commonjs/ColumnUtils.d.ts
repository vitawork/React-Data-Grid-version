import Immutable from 'immutable';
import { Column, CalculatedColumn } from './common/types';
export declare function getSize<T>(columns: T[] | Immutable.List<T>): number;
export declare function canEdit<R>(column: CalculatedColumn<R>, rowData: R, enableCellSelect?: boolean): boolean;
export declare function isFrozen<R>(column: Column<R> | CalculatedColumn<R>): boolean;
