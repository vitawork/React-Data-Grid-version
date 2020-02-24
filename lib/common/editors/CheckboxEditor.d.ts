/// <reference types="react" />
import { CalculatedColumn } from '../types';
export interface CheckboxEditorProps<R> {
    value?: boolean;
    rowIdx: number;
    column: CalculatedColumn<R>;
    dependentValues: unknown;
}
export default function CheckboxEditor<R>({ value, rowIdx, column, dependentValues }: CheckboxEditorProps<R>): JSX.Element;
