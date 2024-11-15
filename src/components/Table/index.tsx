import React from 'react';

import './styles.scss';

interface Column {
  header: string;
  accessor: string;
  toMap?: (value: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="table">
      <div className="table-header">
        {columns.map((column) => (
          <span key={column.accessor}>{column.header}</span>
        ))}
      </div>
      <div className="table-body">
        {data.map((row, rowIndex) => (
          <div className="table-row" key={rowIndex}>
            {columns.map((column) => {
              const value = row[column.accessor];
              return (
                <span key={column.accessor}>
                  {column.toMap ? column.toMap(value) : value}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;