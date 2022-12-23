import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";
import whealthLogo from "../assets/wealthLogo.png";
function Home(props) {
  let navigate = useNavigate();
  return (
    <>
      <header>
        <div className="logo flex justify-center w-62 h-60">
          <img src={whealthLogo} alt="" className="image-logo" />
        </div>
        <hr />
      </header>
      <h1 className="text-center font-extrabold text-3xl">HRnet</h1>
      <div
        className="link-redirection text-center cursor-pointer mt-7 underline"
        onClick={() => {
          navigate("/currentEmployee");
        }}
      >
        View Current Employees
      </div>
      <main className="flex justify-center">
        <UserForm />
      </main>
    </>
  );
}

export default Home;
