import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import GlobalFilter from "./GlobalFilter";
function TableUser(props) {
  const { employees } = useSelector((state) => state.employeeList);
  console.log("employees:", employees);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => employees, [employees]);
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table id="customers" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getFooterGroupProps()}>
              {headerGroups.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronUp />
                      )
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          className="bnt-table"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="bnt-table"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TableUser;
