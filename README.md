# react-data-grid-m1n-version


## Install

```sh
npm install react-data-grid-m1n-version
```

## Usage

```jsx
import ReactDataGrid from 'react-data-grid-m1n-version';

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
const rows = [{ id: 1, title: 'Title 1' }, ...];
const rowGetter = rowNumber => rows[rowNumber];

const Grid = () => {
  return <ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    minHeight={500} />);
}
```

## Exports
Aside from the grid this package exports:

name                   | source                                  |
-----------------------|-----------------------------------------|
RowComparer            | [RowComparer](./src/RowComparer.js)     |
RowsContainer          | [RowsContainer](./src/RowsContainer.js) |
Row                    | [Row](./src/Row.js)                     |
Cell                   | [Cell](./src/Cell.js)                   |
HeaderCell             | [HeaderCell](./src/HeaderCell.js)       |
shapes                 | [shapes](./src/PropTypeShapes)          |
_helpers               | [_helpers](./src/helpers)               |
