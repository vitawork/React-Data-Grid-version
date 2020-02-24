/// <reference types="react" />
export interface ChildRowDeleteButtonProps {
    treeDepth: number;
    cellHeight: number;
    onDeleteSubRow(): void;
    isDeleteSubRowEnabled: boolean;
}
export default function ChildRowDeleteButton({ treeDepth, cellHeight, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps): JSX.Element;
