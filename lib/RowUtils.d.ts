export declare function get<R>(row: R, property: keyof R): R[keyof R];
interface Keys {
    rowKey?: string;
    values?: string[];
}
export declare function isRowSelected<R, K extends keyof R>(keys?: Keys | null, indexes?: number[] | null, isSelectedKey?: string | null, rowData?: R, rowIdx?: number): boolean;
export {};
