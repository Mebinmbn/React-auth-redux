import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import AddUserModel from "../components/AddUserModel";
import ConformDelete from "../components/ConformDelete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilterdUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.role === "user") {
      navigate("/");
      toast.error("Access denied");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFilterdUserData(
      userData.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, userData]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const addUser = async (name, email, password) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/admin/add",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        closeModel();
        fetchUser();
        toast.success("User added successfully");
        console.log("user created");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const onEdit = (user) => {
    setCurrentUser(user);
    setModelOpen(true);
  };

  const closDelete = () => {
    setDeleteOpen(false);
    setUserToDelete(null);
  };

  const editUser = async (id, name, email, password) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const response = await axios.put(
        `http://localhost:5000/api/admin/${id}`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        closeModel();
        fetchUser();
        toast.success("User updated successfully");
        console.log("user updated");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const onDelete = (user) => {
    setUserToDelete(user);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete._id);
      setDeleteOpen(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const response = await axios.delete(
        `http://localhost:5000/api/admin/${id}`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        fetchUser();
        toast.success("User deleted successfully");
        console.log("user deleted");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
          </div>
          <div className="my-2 flex justify-end">
            <input
              type="text"
              placeholder="Search user"
              className="border border-gray-200 bg-white me-5 text-sm"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => setModelOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add user
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    No.
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((user, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.role}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        className="bg-green-500 text-white px-5 py-2 rounded mr-2"
                        onClick={() => {
                          onEdit(user);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-2 rounded"
                        onClick={() => {
                          onDelete(user);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <AddUserModel
          closeModel={closeModel}
          addUser={addUser}
          currentUser={currentUser}
          editUser={editUser}
        />
      )}
      {isDeleteOpen && (
        <ConformDelete
          closDelete={closDelete}
          userToDelete={userToDelete}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default Home;
