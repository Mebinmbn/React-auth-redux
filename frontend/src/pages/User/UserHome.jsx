import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserHome() {
  const [userData, setUserData] = useState([]);

  const [isProfileModelOn, setProfileModel] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user?.role === "admin") {
      navigate("/admin");
      toast.error("Access denied");
    }
  }, [user, navigate]);

  const updateProfileImage = async (base64) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/user/upload/${user.user.id}`,
        {
          profileImage: base64,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Imgage uploaded successfully");
      }

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token in uer home", token);
      const { data } = await axios.get(
        `http://localhost:5000/api/user/${user.user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData);

  const closeModal = () => {
    setProfileModel(false);
    fetchUser();
  };

  return (
    <div>
      <Navbar setProfileModel={setProfileModel} />
      <div className="flex justify-center items-center h-screen w-full ">
        <p className="text-5xl font-bold">
          WELCOME TO THE HOME PAGE{" "}
          {user.user ? user.user.name.toUpperCase() : ", PLEASE LOGIN"}
        </p>
      </div>

      {isProfileModelOn && (
        <UserProfile
          sampleData={userData}
          closeModal={closeModal}
          updateProfileImage={updateProfileImage}
        />
      )}
    </div>
  );
}

export default UserHome;
