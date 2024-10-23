import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../app/features/userSlice";

const Navbar = memo(function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Admin Dashboard</Link>
      </div>
      <div className="flex justify-between align-middle">
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded mr-4"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4 mt-2">{user?.name}</span>
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

export default Navbar;
