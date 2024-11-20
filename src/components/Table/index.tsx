import React from 'react';

import './styles.scss';

interface Column {
  header: string;
  accessor: string;
  toMap?: (value: unknown) => React.ReactNode;
  className?: string;
  classForWidth?: string;
}

interface TableProps {
  data: unknown[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data = [], columns }) => {
  return (
    <div className="table">
      <div className="table-header">
        {columns.map((column) => (
          <span className={`table-header-item ${column.classForWidth}`} key={column.accessor}>{column.header}</span>
        ))}
      </div>
      <div className={`table-body ${!data?.length ? 'table-body--without-data' : ''}`}>
        { data?.length ? data.map((row, rowIndex) => (
          <div className="table-row" key={rowIndex}>
            {columns.map((column) => {
              let value = row;

              if (column.accessor) {
                value = row[column.accessor];
              }

              return (
                <span className={`${column.className} ${column.classForWidth}`} key={column.accessor}>
                  {column.toMap ? column.toMap(value) : value}
                </span>
              );
            })}
          </div>
        )) : (
          <span className="table-no-data">No hay datos</span>
        )}
      </div>
    </div>
  );
};

export default Table;
