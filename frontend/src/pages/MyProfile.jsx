import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-7xl w-[90%] mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
      <div className="flex flex-col items-center gap-4">
        {/* Profile Image Section */}
        <div className="relative">
          <img
            className="w-32 h-32 object-cover rounded-full border-2 border-primary"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
          {isEdit && (
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer"
            >
              <img
                className="w-5 h-5"
                src={assets.upload_icon}
                alt="Upload Icon"
              />
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
        </div>

        {/* Name */}
        {isEdit ? (
          <input
            className="text-2xl font-bold text-center bg-gray-100 rounded p-2"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-2xl font-bold text-center">{userData.name}</h1>
        )}

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-4"></div>

        {/* Contact Information */}
        <div className="w-full">
          <h2 className="text-gray-500 text-sm mb-2">CONTACT INFORMATION</h2>
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <p className="text-blue-500">{userData.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs text-gray-500">Phone</label>
              {isEdit ? (
                <input
                  className="w-full p-2 bg-gray-100 rounded"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-xs text-gray-500">Address</label>
              {isEdit ? (
                <>
                  <input
                    className="w-full p-2 mb-2 bg-gray-100 rounded"
                    type="text"
                    placeholder="Line 1"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="w-full p-2 bg-gray-100 rounded"
                    type="text"
                    placeholder="Line 2"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </>
              ) : (
                <p className="text-gray-600">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-4"></div>

        {/* Basic Information */}
        <div className="w-full">
          <h2 className="text-gray-500 text-sm mb-2">BASIC INFORMATION</h2>
          <div className="flex flex-col gap-4">
            {/* Gender */}
            <div>
              <label className="text-xs text-gray-500">Gender</label>
              {isEdit ? (
                <select
                  className="w-full p-2 bg-gray-100 rounded"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="text-xs text-gray-500">Birthday</label>
              {isEdit ? (
                <input
                  className="w-full p-2 bg-gray-100 rounded"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default MyProfile;
