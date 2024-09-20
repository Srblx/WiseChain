import React from 'react';
import AddButton from './shared/AddButton.component';

export interface Column<T> {
  header: string;
  render: (item: T, index?: number) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string; // Classe CSS pour les largeurs
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  addButtonText?: string;
}

function GenericTable<T>({
  data,
  columns,
  onAdd,
  addButtonText,
}: GenericTableProps<T>) {
  return (
    <>
      {onAdd && addButtonText && (
        <AddButton onClick={onAdd} text={addButtonText} />
      )}
      <div className="overflow-x-auto h-[730px]">
        <table className="table table-sm table-pin-rows table-pin-cols bg-gray-600">
          <thead>
            <tr className="text-lg text-center z-0">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={column.className}
                  style={column.style}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={column.className}
                    style={column.style}
                  >
                    {column.render(item, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot style={{zIndex: 0}}>
            <tr className="text-lg text-center">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={column.className}
                  style={column.style}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default GenericTable;
