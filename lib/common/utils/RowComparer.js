export default function shouldRowUpdate(nextProps, currentProps) {
    return currentProps.columns !== nextProps.columns
        || nextProps.row !== currentProps.row
        || currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx
        || currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx
        || currentProps.isSelected !== nextProps.isSelected
        || currentProps.isScrolling !== nextProps.isScrolling
        || nextProps.height !== currentProps.height
        || currentProps.extraClasses !== nextProps.extraClasses;
}
//# sourceMappingURL=RowComparer.js.map