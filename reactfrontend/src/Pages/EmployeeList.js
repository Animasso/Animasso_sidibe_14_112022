import React from "react";
import TableUser from "../Components/TableUser";
import { useNavigate } from "react-router-dom";
function EmployeeList(props) {
  let navigate = useNavigate();
  return (
    <div>
      <TableUser />
      <div
        className="link-redirection"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </div>
    </div>
  );
}

export default EmployeeList;
