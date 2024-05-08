import axios from "axios";
import { useState, useEffect } from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import {
  CloudIcon,
  DollarIcon,
  EarnIcon,
  ReelsIcon,
  TotalPosts,
  UserIcon,
} from "../../SVG/SVG";
import AgePieChart from "../../components/Admin/AgePieChart";
import DashboardGrid from "../../components/Admin/DashboardGrid";
import CommentsLineChart from "../../components/Admin/OrdersLineChart";
import "./Admin.css";
import OrdersLineChart from "../../components/Admin/OrdersLineChart";

export default function Admin() {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReveune, setTotalReveune] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user count
      const usersResponse = await axios.get(`/users`);
      setTotalUsers(usersResponse.data.length);
      setUsers(usersResponse.data);

      let artistCount = 0;
      let allOrders = 0;
      let totalReveune = 0;
      for (const user of usersResponse.data) {
        if (user.isArtist) {
          artistCount++;
        }
        // Fetch orders for each user and calculate total orders
        allOrders += user.orders.length;
        totalReveune += user.orders.reduce(
          (total: any, order: { totalAmount: any; }) => total + order.totalAmount,
          0
        );

      }
      setTotalArtists(artistCount);
      setTotalOrders(allOrders);
      setTotalReveune(totalReveune);
      

      // Fetch total artist
      // Fetch total reels

      // Fetch Cloudinary usage
      const cloudinaryResponse = await axios.get(`/getstorage`);

      // Calculate total storage in GB
      const totalBytes = cloudinaryResponse.data.reduce(
        (total: any, resource: { bytes: any; }) => total + resource.bytes,
        0
      );
      setTotalStorage(totalBytes / (1024 * 1024));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100">
      {/* Main Content */}
      <div className="p-8 lg:w-3/4">
        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <DashboardGrid
            title="Total Users"
            value={totalUsers}
            Icon={<UserIcon />}
          />

          <DashboardGrid
            title="Total Artists"
            value={totalArtists}
            Icon={<UserIcon />}
          />

          <DashboardGrid
            title="Total Orders"
            value={totalOrders}
            Icon={<EarnIcon />}
          />

          <DashboardGrid
            title={"Storage"}
            value={`${totalStorage.toFixed(2)} MB`}
            Icon={<CloudIcon />}
          />

          <DashboardGrid
            title="Total Revenue"
            value={`$${totalReveune.toFixed(2)}`}
            Icon={<DollarIcon />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 ">
          <AgePieChart users={users} />
          <OrdersLineChart users={users} />
        </div>
      </div>

      {/* Sidebar */}
      <AdminSideBar />
    </div>
  );
}
