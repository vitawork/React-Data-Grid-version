/// <reference types="react" />
import { CellContentProps } from './CellContent';
declare type CellValueProps<R> = Pick<CellContentProps<R>, 'rowIdx' | 'rowData' | 'column' | 'value' | 'isScrolling'>;
export default function CellValue<R>({ rowIdx, rowData, column, value, isScrolling }: CellValueProps<R>): JSX.Element;
export {};
