import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";
import whealthLogo from "../assets/wealthLogo.png";
function Home(props) {
  let navigate = useNavigate();
  return (
    <>
      <header>
        <div className="logo flex justify-center w-62 h-48">
          <img src={whealthLogo} alt="" className="image-logo" />
        </div>
      </header>
      <main className="bg-gradient-to-bl from-lime-100 via-lime-600 to-lime-900 border-t-4">
        <h1 className="text-center font-extrabold text-3xl mt-3">HRnet</h1>
        <div
          className="link-redirection text-center cursor-pointer mt-7 underline"
          onClick={() => {
            navigate("/currentEmployee");
          }}
        >
          View Current Employees
        </div>
        <div className="flex justify-center">
          <UserForm />
        </div>
      </main>
    </>
  );
}

export default Home;
