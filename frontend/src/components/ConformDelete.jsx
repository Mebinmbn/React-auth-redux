import PropTypes from "prop-types";

function ConformDelete({ closDelete, userToDelete, confirmDelete }) {
  console.log(userToDelete);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="mb-4 text-lg">
          Are you sure you want to delete {userToDelete.name} ?
        </h3>
        <div className="flexed flex items-center justify-center">
          <button
            onClick={closDelete}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-4 mx-auto"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mx-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

ConformDelete.propTypes = {
  closDelete: PropTypes.func.isRequired,
  userToDelete: PropTypes.object.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default ConformDelete;
