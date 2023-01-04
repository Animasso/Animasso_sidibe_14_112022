import React from "react";
import TableUser from "../Components/TableUser";
import whealthLogo from "../assets/wealthLogo.png";
function EmployeeList(props) {
  return (
    <div className=" h-screen ">
      <header>
        <div className="logo flex justify-center w-62 h-48">
          <img src={whealthLogo} alt="" className="image-logo w-auto h-auto" />
        </div>
      </header>
      <TableUser />
    </div>
  );
}

export default EmployeeList;
