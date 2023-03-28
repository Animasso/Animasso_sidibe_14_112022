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
import { useNavigate } from "react-router-dom";
function TableUser(props) {
  let navigate = useNavigate();
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
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-bl from-lime-100 via-lime-600 to-lime-900">
      <div className=" mt-9 flex flex-col flex-wrap ml-5">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <select
          className="mt-10 w-52 h-10 ml-11 "
          name="pageTotal"
          id="pageTotal"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize} Entries
            </option>
          ))}{" "}
        </select>
      </div>

      <div className=" overflow-x-auto ml-4">
        <table
          id="customers"
          className=" table-auto mt-12 overflow-x-auto "
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroups) => (
              <tr className="" {...headerGroups.getFooterGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th
                    className="border border-black p-2 bg-white "
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <div className=" w-4 h-4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronUp />
                        )
                      ) : (
                        <FaChevronDown />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="border border-black text-lime-600 bg-slate-50"
            {...getTableBodyProps()}
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="hover:bg-slate-200" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className=" border border-black py-2 px-2"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className=" inline-flex mt-4 ml-4 ">
        <button
          className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}{" "}
        </button>
        <button
          className="bnt-table bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="bnt-table bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}{" "}
        </button>
      </div>

      <div className=" mt-5 ml-8">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {""}
        </span>
        <span>
          {" "}
          | Go to page{" "}
          <input
            type="number"
            className=" w-12"
            name="pageNum"
            id="pageNum"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
      </div>
      <div
        className="link-redirection text-center cursor-pointer font-mono font-bold text-2xl text-cyan-50 hover:text-slate-800 underline"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </div>
    </div>
  );
}

export default TableUser;
