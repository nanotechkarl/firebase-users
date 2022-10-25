import { Link, useLocation, Outlet } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="tab">
        <Link to="/">
          <button
            id="users-link"
            className={location.pathname === "/users" ? "selected" : "1"}
          >
            Manage Users
          </button>
        </Link>
        <Link to="/add-user">
          <button
            id="doclist-link"
            className={location.pathname === "/add-user" ? "selected" : ""}
          >
            Add User
          </button>
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
