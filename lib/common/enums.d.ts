export declare enum CellExpand {
    DOWN_TRIANGLE = "\u25BC",
    RIGHT_TRIANGLE = "\u25B6"
}
export declare enum CellNavigationMode {
    NONE = "none",
    CHANGE_ROW = "changeRow",
    LOOP_OVER_ROW = "loopOverRow"
}
export declare enum DragItemTypes {
    Column = "column"
}
export declare enum EventTypes {
    SELECT_CELL = "SELECT_CELL",
    SELECT_START = "SELECT_START",
    SELECT_UPDATE = "SELECT_UPDATE",
    SELECT_END = "SELECT_END",
    DRAG_ENTER = "DRAG_ENTER",
    SCROLL_TO_COLUMN = "SCROLL_TO_COLUMN"
}
export declare enum HeaderRowType {
    HEADER = "header",
    FILTER = "filter"
}
export declare enum HeaderCellType {
    SORTABLE = "SORTABLE",
    FILTERABLE = "FILTERABLE",
    NONE = "NONE",
    CHECKBOX = "CHECKBOX"
}
export declare enum UpdateActions {
    CELL_UPDATE = "CELL_UPDATE",
    COLUMN_FILL = "COLUMN_FILL",
    COPY_PASTE = "COPY_PASTE",
    CELL_DRAG = "CELL_DRAG"
}
export declare enum SCROLL_DIRECTION {
    UP = "upwards",
    DOWN = "downwards",
    LEFT = "left",
    RIGHT = "right",
    NONE = "none"
}
export declare enum DEFINE_SORT {
    ASC = "ASC",
    DESC = "DESC",
    NONE = "NONE"
}
export declare enum Z_INDEXES {
    /**
     * CellMasks should render in front of the cells.
     * Unfrozen cells do not have a z-index specifed.
     */
    CELL_MASK = 1,
    /**
     * EditorContainer is rendered ouside the grid and it should have a z-index
     * equal or greater than the z-index of the frozen cells.
     * Frozen cells have a zIndex value of 2.
     */
    EDITOR_CONTAINER = 2,
    /** Frozen cells have a z-index value of 2 so FROZEN_CELL_MASK should have a greater z-index. */
    FROZEN_CELL_MASK = 3
}
