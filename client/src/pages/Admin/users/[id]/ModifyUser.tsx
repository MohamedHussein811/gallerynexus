import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DisplaySonner } from "../../../../constants/constants";
import AdminSideBar from "../../../../components/Admin/AdminSideBar";

// Label component
const Label = ({ htmlFor, text }: any) => (
  <label
    htmlFor={htmlFor}
    className="block text-gray-700 text-sm font-bold mb-2"
  >
    {text}
  </label>
);

// Checkbox field component
const CheckboxField = ({ id, checked, onChange }: any) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className="mr-2 leading-tight"
  />
);

export default function ModifyUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    profileImage: "",
    isAdmin: false,
    isActivated: false,
    isVerified: false,
    createdAt: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/getuser/${id}`).then((res) => {
      const userData = res.data;
      // Convert date format if necessary
      if (userData.age) {
        userData.age = new Date(userData.age).toISOString().split("T")[0];
      }
      setUser(userData);
    });
  }, [id]);

  const handleSubmit = async () => {
    await axios.post(`/updateuser/${id}`, user).then((res) => {
      DisplaySonner(res.data.message);
    });
  };

  const handleDeleteUser = async () => {
    await axios.post("/deleteuser", { id }).then((res) => {
      DisplaySonner(res.data.message);
      navigate("/admin/users");
    });
  };

  return (
    <>
      <div className=" bg-gray-100 p-0 lg:p-12">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label htmlFor="username" text="Username" />
            <input
              type="text"
              value={user?.username}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  username: e.target.value,
                }))
              }
              className="text-black"
            />
            <Label htmlFor="email" text="Email" />
            <input
              type="email"
              value={user?.email}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  email: e.target.value,
                }))
              }
              className="text-black"
            />
            <Label htmlFor="phone" text="Phone" />
            <input
              type="text"
              value={user?.phone}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  phone: e.target.value,
                }))
              }
              className="text-black"
            />
            <Label htmlFor="age" text="Age" />
            <input
              type="date"
              value={user?.age}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  age: e.target.value,
                }))
              }
              className="text-black"
            />
            <Label htmlFor="profileImage" text="Profile Image" />
            <input
              type="text"
              value={user?.profileImage}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  profileImage: e.target.value,
                }))
              }
              className="text-black"
            />
            <Label htmlFor="isAdmin" text="Is Admin" />
            <CheckboxField
              checked={user?.isAdmin}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  isAdmin: e.target.checked,
                }))
              }
            />
            <Label htmlFor="isActivated" text="Is Activated" />
            <CheckboxField
              checked={user?.isActivated}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  isActivated: e.target.checked,
                }))
              }
            />
            <Label htmlFor="isVerified" text="Is Verified" />
            <CheckboxField
              checked={user?.isVerified}
              onChange={(e: any) =>
                setUser((prevUser: any) => ({
                  ...prevUser,
                  isVerified: e.target.checked,
                }))
              }
            />

            <Label htmlFor="createdAt" text="Created At" />
            <input
              type="text"
              value={user?.createdAt}
              className="text-black"
              disabled
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              type="submit"
              className="bg-red-500 mx-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDeleteUser}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
      <AdminSideBar />
    </>
  );
}
