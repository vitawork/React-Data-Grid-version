/// <reference types="react" />
import { Props as CellProps } from '../Cell';
declare type CellActionsProps<R> = Pick<CellProps<R>, 'cellMetaData' | 'column' | 'rowData'>;
export default function CellActions<R>({ cellMetaData, column, rowData }: CellActionsProps<R>): JSX.Element | null;
export {};
