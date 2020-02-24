import React from 'react';
import { ToolbarProps } from './ToolbarContainer';
import { CheckboxEditorProps } from './common/editors/CheckboxEditor';
import { SelectAll } from './formatters';
import { ScrollState } from './Viewport';
import { RowsContainerProps } from './RowsContainer';
import { CellNavigationMode, DEFINE_SORT } from './common/enums';
import { AddFilterEvent, CalculatedColumn, CellActionButton, CellCopyPasteEvent, CheckCellIsEditableEvent, Column, ColumnList, ColumnMetrics, CommitEvent, GridRowsUpdatedEvent, HeaderRowData, InteractionMasksMetaData, Position, RowExpandToggleEvent, RowGetter, RowSelection, RowSelectionParams, SelectedRange, SubRowDetails, SubRowOptions, SelectedRow, RowRendererProps } from './common/types';
export interface DataGridProps<R extends {}> {
    /** An array of objects representing each column on the grid. Can also be an ImmutableJS object */
    columns: ColumnList<R>;
    /** The minimum width of the grid in pixels */
    minWidth?: number;
    /** The height of the header row in pixels */
    headerRowHeight?: number;
    /** The height of the header filter row in pixels */
    headerFiltersHeight: number;
    /** Deprecated: Legacy prop to turn on row selection. Use rowSelection props instead*/
    enableRowSelect: boolean | string;
    /** Component used to render toolbar above the grid */
    toolbar?: React.ReactElement<ToolbarProps<R>> | React.ComponentType<ToolbarProps<R>>;
    cellRangeSelection?: {
        onStart(selectedRange: SelectedRange): void;
        onUpdate?(selectedRange: SelectedRange): void;
        onComplete?(selectedRange: SelectedRange): void;
    };
    /** Minimum column width in pixels */
    minColumnWidth: number;
    /** Component to render the UI in the header row for selecting all rows */
    selectAllRenderer: React.ComponentType<React.ComponentProps<typeof SelectAll>>;
    /** Function called whenever row is clicked */
    onRowClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
    /** Function called whenever row is double clicked */
    onRowDoubleClick?(rowIdx: number, rowData: R, column: CalculatedColumn<R>): void;
    onAddFilter?(event: AddFilterEvent<R>): void;
    onClearFilters?(): void;
    /** Function called whenever grid is sorted*/
    onGridSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
    /** Function called whenever keyboard key is released */
    onGridKeyUp?(event: React.KeyboardEvent<HTMLDivElement>): void;
    /** Function called whenever keyboard key is pressed down */
    onGridKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
    onRowSelect?(rowData: R[]): void;
    columnEquality(c1: Column<R>, c2: Column<R>): boolean;
    rowSelection?: {
        enableShiftSelect?: boolean;
        /** Function called whenever rows are selected */
        onRowsSelected?(args: RowSelectionParams<R>[]): void;
        /** Function called whenever rows are deselected */
        onRowsDeselected?(args: RowSelectionParams<R>[]): void;
        /** toggle whether to show a checkbox in first column to select rows */
        showCheckbox?: boolean;
        /** Method by which rows should be selected */
        selectBy: RowSelection;
    };
    /** Custom checkbox formatter */
    rowActionsCell?: React.ComponentType<CheckboxEditorProps<R>>;
    /**
     * Callback called whenever row data is updated
     * When editing is enabled, this callback will be called for the following scenarios
     * 1. Using the supplied editor of the column. The default editor is the SimpleTextEditor.
     * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
     * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
     * 4. Update all cells under a given cell by double clicking the cell's fill handle.
     */
    onGridRowsUpdated?<E extends GridRowsUpdatedEvent<R>>(event: E): void;
    /** Called when a column is resized */
    onColumnResize?(idx: number, width: number): void;
    /** Grid Props */
    /** The primary key property of each row */
    rowKey: keyof R;
    /** The height of each row in pixels */
    rowHeight: number;
    rowRenderer?: React.ReactElement | React.ComponentType<RowRendererProps<R>>;
    rowGroupRenderer?: React.ComponentType;
    /** A function called for each rendered row that should return a plain key/value pair object */
    rowGetter: RowGetter<R>;
    /** The number of rows to be rendered */
    rowsCount: number;
    /** The minimum height of the grid in pixels */
    minHeight: number;
    /** When set, grid will scroll to this row index */
    scrollToRowIndex?: number;
    /** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
    contextMenu?: React.ReactElement;
    /** Used to toggle whether cells can be selected or not */
    enableCellSelect: boolean;
    /** Toggles whether cells should be autofocused */
    enableCellAutoFocus: boolean;
    cellNavigationMode: CellNavigationMode;
    /** The node where the editor portal should mount. */
    editorPortalTarget: Element;
    /** The key of the column which is currently being sorted */
    sortColumn?: keyof R;
    /** The direction to sort the sortColumn*/
    sortDirection?: DEFINE_SORT;
    /** Called when the grid is scrolled */
    onScroll?(scrollState: ScrollState): void;
    /** Component used to render a draggable header cell */
    draggableHeaderCell?: React.ComponentType<{
        column: CalculatedColumn<R>;
        onHeaderDrop(): void;
    }>;
    getValidFilterValues?(columnKey: keyof R): unknown;
    RowsContainer?: React.ComponentType<RowsContainerProps>;
    emptyRowsView?: React.ComponentType<{}>;
    onHeaderDrop?(): void;
    getSubRowDetails?(row: R): SubRowDetails;
    /** CellMetaData */
    getCellActions?(column: CalculatedColumn<R>, rowData: R): CellActionButton[] | undefined;
    /** Called whenever a sub row is deleted from the grid */
    onDeleteSubRow?(options: SubRowOptions<R>): void;
    /** Called whenever a sub row is added to the grid */
    onAddSubRow?(): void;
    /** Function called whenever a cell has been expanded */
    onCellExpand?(options: SubRowOptions<R>): void;
    onRowExpandToggle?(event: RowExpandToggleEvent): void;
    /** InteractionMasksMetaData */
    /** Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead*/
    onCellCopyPaste?(event: CellCopyPasteEvent<R>): void;
    /** Function called whenever a cell is selected */
    onCellSelected?(position: Position): void;
    /** Function called whenever a cell is deselected */
    onCellDeSelected?(position: Position): void;
    /** called before cell is set active, returns a boolean to determine whether cell is editable */
    onCheckCellIsEditable?(event: CheckCellIsEditableEvent<R>): boolean;
}
declare type DefaultProps = Pick<DataGridProps<{
    id?: unknown;
}>, 'enableCellSelect' | 'selectAllRenderer' | 'rowHeight' | 'headerFiltersHeight' | 'enableRowSelect' | 'minHeight' | 'rowKey' | 'cellNavigationMode' | 'enableCellAutoFocus' | 'minColumnWidth' | 'columnEquality' | 'editorPortalTarget'>;
export interface DataGridState<R> {
    columnMetrics: ColumnMetrics<R>;
    lastRowIdxUiSelected: number;
    selectedRows: SelectedRow<R>[];
    canFilter?: boolean;
    sortColumn?: keyof R;
    sortDirection?: DEFINE_SORT;
}
/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <ReactDataGrid columns={columns} rowGetter={i => rows[i]} rowsCount={3} />
*/
export default class ReactDataGrid<R extends {}> extends React.Component<DataGridProps<R>, DataGridState<R>> {
    static displayName: string;
    static defaultProps: DefaultProps;
    private readonly grid;
    private readonly base;
    private readonly selectAllCheckbox;
    private readonly eventBus;
    private readonly _keysDown;
    private _cachedColumns?;
    private _cachedComputedColumns?;
    constructor(props: DataGridProps<R>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: DataGridProps<R>): void;
    selectCell({ idx, rowIdx }: Position, openEditor?: boolean): void;
    gridWidth(): number;
    getTotalWidth(): number;
    getColumn(idx: number): CalculatedColumn<R, unknown, keyof R>;
    getSize(): number;
    metricsUpdated: () => void;
    createColumnMetrics(props?: Readonly<DataGridProps<R>> & Readonly<{
        children?: React.ReactNode;
    }>): ColumnMetrics<R>;
    isSingleKeyDown(keyCode: number): boolean;
    handleColumnResize: (idx: number, width: number) => void;
    handleDragEnter: (overRowIdx: number) => void;
    handleViewportKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handleViewportKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handlerCellClick: ({ rowIdx, idx }: Position) => void;
    handleCellMouseDown: (position: Position) => void;
    handleCellMouseEnter: (position: Position) => void;
    handleWindowMouseUp: () => void;
    handleCellContextMenu: (position: Position) => void;
    handleCellDoubleClick: ({ rowIdx, idx }: Position) => void;
    handleToggleFilter: () => void;
    handleDragHandleDoubleClick: InteractionMasksMetaData<R>['onDragHandleDoubleClick'];
    handleGridRowsUpdated: InteractionMasksMetaData<R>['onGridRowsUpdated'];
    handleCommit: (commit: CommitEvent<R, never>) => void;
    handleSort: (sortColumn: keyof R, sortDirection: DEFINE_SORT) => void;
    getSelectedRow(rows: SelectedRow<R>[], key: unknown): SelectedRow<R> | undefined;
    useNewRowSelection: () => {
        indexes?: number[] | undefined;
    } | {
        isSelectedKey?: string | undefined;
    } | {
        keys?: {
            values: unknown[];
            rowKey: string;
        } | undefined;
    } | undefined;
    handleShiftSelect: (rowIdx: number) => boolean;
    handleNewRowSelect: (rowIdx: number, rowData: R) => void;
    handleRowSelect: (rowIdx: number, columnKey: keyof R, rowData: R, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getRowOffsetHeight(): number;
    getHeaderRows(): HeaderRowData<R>[];
    getRowSelectionProps(): {
        indexes?: number[] | undefined;
    } | {
        isSelectedKey?: string | undefined;
    } | {
        keys?: {
            values: unknown[];
            rowKey: string;
        } | undefined;
    } | undefined;
    getSelectedRows(): SelectedRow<R>[] | undefined;
    openCellEditor(rowIdx: number, idx: number): void;
    scrollToColumn(colIdx: number): void;
    setupGridColumns(props?: Readonly<DataGridProps<R>> & Readonly<{
        children?: React.ReactNode;
    }>): ColumnList<R>;
    render(): JSX.Element;
}
export declare type ReactDataGridProps<R extends {}> = JSX.LibraryManagedAttributes<typeof ReactDataGrid, DataGridProps<R>>;
export {};
