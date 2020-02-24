"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var columns = [{
        idx: 0,
        key: 'id',
        name: 'ID',
        width: 100,
        left: 0
    }, {
        idx: 1,
        key: 'title',
        name: 'Title',
        width: 100,
        left: 100
    }, {
        idx: 2,
        key: 'count',
        name: 'Count',
        width: 100,
        left: 200
    }];
var _rows = [];
for (var i = 0; i < 1000; i++) {
    _rows.push({
        id: i,
        title: "Title " + i,
        count: i * 1000
    });
}
exports.default = {
    columns: columns,
    rowGetter: function (i) {
        return _rows[i];
    },
    rowsCount: function () {
        return _rows.length;
    },
    cellMetaData: {
        selected: { idx: 2, rowIdx: 3 },
        dragged: null,
        copied: null
    }
};
exports.fakeCellMetaData = {
    rowKey: 'id',
    onCellClick: function () { return null; },
    onCellMouseDown: function () { return null; },
    onCellExpand: function () { return null; },
    onCellMouseEnter: function () { return null; },
    onCellContextMenu: function () { return null; },
    onRowExpandToggle: function () { return null; },
    onCellDoubleClick: function () { return null; },
    onDragEnter: function () { return null; }
};
//# sourceMappingURL=GridPropHelpers.js.map