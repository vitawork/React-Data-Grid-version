/// <reference types="react" />
import { Props as CellProps } from '../Cell';
export declare type CellContentProps<R> = Pick<CellProps<R>, 'idx' | 'rowIdx' | 'rowData' | 'column' | 'value' | 'isScrolling' | 'expandableOptions' | 'tooltip' | 'height' | 'cellControls' | 'cellMetaData'>;
export default function CellContent<R>({ idx, tooltip, expandableOptions, height, cellMetaData, cellControls, ...props }: CellContentProps<R>): JSX.Element;
