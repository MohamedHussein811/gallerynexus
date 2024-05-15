import axios from "axios";
import { useEffect, useState } from "react";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import { Link, useNavigate } from "react-router-dom";
import { DisplaySonner } from "../../../constants/constants";
export interface Ban {
  status: boolean;
  reason: string;
  suspendedAt: string;
  suspendedTill: string;
}
export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
  phone: string;
  age: Date;
  isActivated: boolean;
  isVerified: boolean;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  suspended: Ban;
}

export default function Users({ apiUrl = "/users" }) {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleUnDelete = async (userId: string) => {
    const res = await axios.post(`/undeleteuser`, {
      id: userId,
    });
    if (res.status === 200) {
      setUsers([res.data]);
      DisplaySonner(res.data.message);
      navigate("/Admin/users");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-gray-100 p-8">
        {users &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-[20px] shadow-lg overflow-hidden transform transition duration-300"
            >
              <div className="flex justify-center pt-4">
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white hover:border-blue-500"
                />
              </div>
              <div className="p-6 flex flex-col items-center">
                <p className="text-2xl font-semibold text-center mb-2 text-gray-800">
                  {user.username}
                </p>
                <p className="text-sm text-gray-600 text-center mb-2">
                  {user.email}
                </p>
                <div className="flex justify-center items-center mb-4">
                  <span className="text-sm text-gray-600 mr-2">Admin:</span>
                  <span
                    className={`text-sm font-semibold ${
                      user.isAdmin ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.isAdmin ? "Yes" : "No"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center mb-2">
                  {user.phone}
                </p>
                <p className="text-sm text-gray-600 text-center mb-2">
                  Age: {new Date(user.age).toLocaleString()}
                </p>
                <div className="flex justify-center items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Activated:</span>
                  <span
                    className={`text-sm font-semibold ${
                      user.isActivated ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.isActivated ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-center items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Verified:</span>
                  <span
                    className={`text-sm font-semibold ${
                      user.isVerified ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </div>


                <div className="flex justify-between text-xs text-gray-600 mt-4">
                  <p className="mx-2">
                    Created At:
                    <br /> {new Date(user.createdAt).toLocaleString()}
                  </p>
                  <p className="mx-2">
                    Updated At:
                    <br /> {new Date(user.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {apiUrl === "/users" ? (
                <Link to={`/Admin/users/${user._id}`}>
                  <div className="bg-blue-500 text-white text-center py-2 hover:bg-blue-700 transition-all duration-300 cursor-pointer">
                    Modify Account
                  </div>
                </Link>
              ) : (
                <div>
                  <div
                    className="bg-blue-500 text-white text-center py-2 hover:bg-blue-700 transition-all duration-300 cursor-pointer"
                    onClick={() => handleUnDelete(user._id)}
                  >
                    Unremove Account
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      <AdminSideBar />
    </>
  );
}
