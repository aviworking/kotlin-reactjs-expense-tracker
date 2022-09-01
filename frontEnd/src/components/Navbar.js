import { NavLink } from "react-router-dom";

//Navigation bar component.
const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div>
          <NavLink to="/">
            <span className="navbar-brand">Categories</span>
          </NavLink>

          <NavLink to="/expenses" className="">
            <span className="navbar-brand">Expenses</span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/">
            <span className="navbar-brand">Expense-Tracker-App</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
