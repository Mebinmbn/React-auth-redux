import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../app/features/userSlice";
import PropTypes from "prop-types";

const Navbar = memo(function Navbar({ setProfileModel }) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  console.log(user);
  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        {user.user?.role !== "admin" ? (
          <Link to="/">Home</Link>
        ) : (
          <Link to="/admin">Admin Dashboard</Link>
        )}
      </div>
      <div className="flex justify-between align-middle">
        {!user.user ? (
          <>
            <Link
              to="/userlogin"
              className="bg-blue-500 px-4 py-2 rounded mr-4"
            >
              Login/Signup
            </Link>
            {/* <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded mr-4"
            >
              SignUp
            </Link> */}
          </>
        ) : (
          <>
            <span className="mr-4 mt-2">
              WELCOME {user.user.name.toUpperCase()}
            </span>
            {user.user?.role === "user" && (
              <button
                className="bg-blue-500 px-4 py-2 rounded mx-4"
                onClick={() => {
                  setProfileModel(true);
                }}
              >
                Profile
              </button>
            )}
            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
});

Navbar.propTypes = {
  setProfileModel: PropTypes.func.isRequired,
};

export default Navbar;
