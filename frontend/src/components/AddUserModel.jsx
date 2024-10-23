import { useEffect, useState } from "react";
// import axios from "axios";

import PropTypes from "prop-types";

function AddUserModel({ closeModel, addUser, currentUser, editUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      editUser(currentUser._id, name, email, password);
    } else {
      addUser(name, email, password);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">
          {currentUser ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            className="w-full mb-4 p-2 border"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="email"
            value={email}
            className="w-full mb-4 p-2 border"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            className="w-full mb-4 p-2 border"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {currentUser ? "Update User" : "Add User"}
          </button>
        </form>
        <button className="mt-4 ms-2 text-red-500" onClick={closeModel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

AddUserModel.propTypes = {
  closeModel: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  currentUser: PropTypes.any.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default AddUserModel;
