import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// import avtar from "../../assets/avtar.png";

const UserProfileModal = ({ sampleData, closeModal, updateProfileImage }) => {
  const [base64, setBase64] = useState("");

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!base64) {
      toast.error("Please select the image");
    } else {
      updateProfileImage(base64);
      console.log(base64);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow w-100 h-2/3 text-center">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-white">
            &#x2715;
          </button>
        </div>
        <div className="flex mb-4 text-center justify-center">
          <img
            className="w-20 h-20 rounded-full mr-4 mb-5 border"
            src={base64 || sampleData.profileImage}
            alt={`${sampleData.name}'s profile`}
          />
        </div>
        <div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {sampleData.name.toUpperCase()}
            </h2>
            <p className="text-white">{sampleData.email}</p>
          </div>
          <p className="text-white mb-5">
            <strong>Role:</strong> {sampleData.role}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-white">Upload Profile Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

UserProfileModal.propTypes = {
  sampleData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
};

export default UserProfileModal;
