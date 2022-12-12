import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";
import whealthLogo from "../assets/wealthLogo.png";
function Home(props) {
  let navigate = useNavigate();
  return (
    <>
      <header>
        <div className="logo">
          <img src={whealthLogo} alt="" className="image-logo" />
        </div>
      </header>
      <hr />
      <h1>HRnet</h1>
      <div
        className="link-redirection"
        onClick={() => {
          navigate("/currentEmployee");
        }}
      >
        View Current Employees
      </div>
      <main>
        <UserForm />
      </main>
    </>
  );
}

export default Home;
