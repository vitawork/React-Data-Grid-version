export declare const test: {
    GridPropHelpers: {
        columns: import("..").CalculatedColumn<import("./test/GridPropHelpers").Row, unknown, "description" | "title" | "count" | "id">[];
        rowGetter(i: number): import("./test/GridPropHelpers").Row;
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
};
