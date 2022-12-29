import React from "react";
import TableUser from "../Components/TableUser";
import { useNavigate } from "react-router-dom";
function EmployeeList(props) {
  let navigate = useNavigate();
  return (
    <div className=" flex flex-col bg-gradient-to-bl from-lime-100 via-lime-600 to-lime-900">
      <TableUser />
      <div
        className="link-redirection text-center cursor-pointer"
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
