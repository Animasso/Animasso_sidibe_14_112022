import React from "react";
import TableUser from "../Components/TableUser";
import { useNavigate } from "react-router-dom";
function EmployeeList(props) {
  let navigate = useNavigate();
  return (
    <>
      <TableUser />
      <div
        className="link-redirection text-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </div>
    </>
  );
}

export default EmployeeList;
