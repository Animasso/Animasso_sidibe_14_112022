import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EmployeeList from "./Pages/EmployeeList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/currentEmployee"
          element={<EmployeeList />}
          // userSignup={userSignup}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
