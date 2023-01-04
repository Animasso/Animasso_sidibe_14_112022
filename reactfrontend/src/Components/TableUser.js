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
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter } = state;
  return (
    <div className="h-screen flex flex-col bg-gradient-to-bl from-lime-100 via-lime-600 to-lime-900">
      <div className=" mt-9 place-self-start ml-5">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className=" overflow-x-auto ml-16">
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
                    <div className="ml-2 mt-1">
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
                <tr {...row.getRowProps()}>
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
      <div className=" inline-flex mt-4 ml-16 ">
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
