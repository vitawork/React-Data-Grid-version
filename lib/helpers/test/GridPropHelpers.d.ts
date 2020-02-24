import { CalculatedColumn, CellMetaData } from '../../common/types';
export interface Row {
    id?: number;
    title?: string;
    count?: number;
    description?: string;
}
declare const _default: {
    columns: CalculatedColumn<Row, unknown, "description" | "title" | "count" | "id">[];
    rowGetter(i: number): Row;
    rowsCount(): number;
    cellMetaData: {
        selected: {
            idx: number;
            rowIdx: number;
        };
        dragged: null;
        copied: null;
    };
};
export default _default;
export declare const fakeCellMetaData: CellMetaData<Row>;
