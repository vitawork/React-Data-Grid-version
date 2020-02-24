import React from 'react';
import { DraggedPosition } from './DragMask';
import { NextSelectedCellPosition } from '../utils/SelectedCellUtils';
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn, Position, SelectedRange, Dimension, InteractionMasksMetaData, CommitEvent } from '../common/types';
import { CanvasProps } from '../Canvas';
interface NavAction {
    getNext(current: Position): Position;
    isCellAtBoundary(cell: Position): boolean;
    onHitBoundary(next: Position): void;
}
declare type SharedCanvasProps<R> = Pick<CanvasProps<R>, 'rowGetter' | 'rowsCount' | 'rowHeight' | 'columns' | 'rowVisibleStartIdx' | 'rowVisibleEndIdx' | 'colVisibleStartIdx' | 'colVisibleEndIdx' | 'enableCellSelect' | 'enableCellAutoFocus' | 'cellNavigationMode' | 'eventBus' | 'contextMenu' | 'editorPortalTarget'>;
export interface InteractionMasksProps<R> extends SharedCanvasProps<R>, InteractionMasksMetaData<R> {
    onHitTopBoundary(): void;
    onHitBottomBoundary(): void;
    onHitLeftBoundary(position: Position): void;
    onHitRightBoundary(position: Position): void;
    scrollLeft: number;
    scrollTop: number;
    getRowHeight(rowIdx: number): number;
    getRowTop(rowIdx: number): number;
    getRowColumns(rowIdx: number): CalculatedColumn<R>[];
}
export interface InteractionMasksState {
    selectedPosition: Position;
    selectedRange: SelectedRange;
    copiedPosition: Position & {
        value: unknown;
    } | null;
    draggedPosition: DraggedPosition | null;
    editorPosition: {
        top: number;
        left: number;
    } | null;
    isEditorEnabled: boolean;
    firstEditorKeyPress: string | null;
}
export default class InteractionMasks<R> extends React.Component<InteractionMasksProps<R>, InteractionMasksState> {
    static displayName: string;
    readonly state: Readonly<InteractionMasksState>;
    private readonly selectionMask;
    private readonly copyMask;
    private unsubscribeEventHandlers;
    componentDidUpdate(prevProps: InteractionMasksProps<R>, prevState: InteractionMasksState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getEditorPosition(): {
        left: number;
        top: number;
    } | null;
    setMaskScollLeft(mask: HTMLDivElement | null, position: Position | null, scrollLeft: number): void;
    /**
     * Sets the position of SelectionMask and CopyMask components when the canvas is scrolled
     * This is only required on the frozen columns
     */
    setScrollLeft(scrollLeft: number): void;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    isSelectedCellEditable(): boolean;
    openEditor: (event?: React.KeyboardEvent<HTMLDivElement> | undefined) => void;
    closeEditor(): void;
    onPressKeyWithCtrl({ keyCode }: React.KeyboardEvent<HTMLDivElement>): void;
    onFocus: () => void;
    onPressTab(e: React.KeyboardEvent<HTMLDivElement>): void;
    onPressEscape(): void;
    copyPasteEnabled(): boolean;
    handleCopy(value: unknown): void;
    handleCancelCopy(): void;
    handlePaste(): void;
    isKeyboardNavigationEvent(e: React.KeyboardEvent<HTMLDivElement>): boolean;
    getKeyNavActionFromEvent(e: React.KeyboardEvent<HTMLDivElement>): NavAction | null;
    changeCellFromEvent(e: React.KeyboardEvent<HTMLDivElement>): void;
    changeCellFromKeyAction(e: React.KeyboardEvent<HTMLDivElement>, cellNavigationMode: CellNavigationMode): void;
    changeSelectedRangeFromArrowKeyAction(e: React.KeyboardEvent<HTMLDivElement>): void;
    getNextSelectedCellPositionForKeyNavAction(keyNavAction: NavAction, currentPosition: Position, cellNavigationMode: CellNavigationMode): NextSelectedCellPosition;
    checkIsAtGridBoundary(keyNavAction: NavAction, next: NextSelectedCellPosition): void;
    isCellWithinBounds({ idx, rowIdx }: Position): boolean;
    isGridSelected(): boolean;
    isFocused(): boolean;
    isFocusedOnBody(): boolean;
    focus(): void;
    selectFirstCell(): void;
    selectCell: (cell: Position, openEditor?: boolean | undefined) => void;
    createSingleCellSelectedRange(cellPosition: Position, isDragging: boolean): SelectedRange;
    onSelectCellRangeStarted: (selectedPosition: Position) => void;
    onSelectCellRangeUpdated: (cellPosition: Position, isFromKeyboard?: boolean | undefined, callback?: (() => void) | undefined) => void;
    onSelectCellRangeEnded: () => void;
    isDragEnabled(): boolean;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragEnter: (overRowIdx: number) => void;
    handleDragEnd: () => void;
    onDragHandleDoubleClick: () => void;
    onCommit: (args: CommitEvent<R, never>) => void;
    onCommitCancel: () => void;
    getSelectedDimensions: (selectedPosition: Position, useGridColumns?: boolean | undefined) => Dimension;
    renderSingleCellSelectView(): false | JSX.Element;
    renderCellRangeSelectView(): JSX.Element;
    render(): JSX.Element;
}
export {};
