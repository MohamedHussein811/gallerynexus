import { useEffect, useState } from "react";
import Axios from "axios";
import NotFound from "../../not-found";
import { api, useUser } from "../../constants/constants";
import { Order } from "../../components/Shop/MyOrders/Interfaces";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";
import OrderDetails from "../../components/Shop/MyOrders/OrderDetails";

export default function MyOrders() {
  const { UserID } = useUser();
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await Axios.get(`${api}/getuserorders/${UserID}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        if (res.status === 200) {
          const sortedOrders = res.data.orders.sort(
            (a: Order, b: Order) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setOrders(res.data.orders);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserNotFound(true);
        setLoading(false);
      }
    };
    if (UserID) {
      fetchUserOrders();
      setUserNotFound(false);
      setLoading(false);
    } else {
      setUserNotFound(true);
    }
  }, [UserID,cookies.access_token]);

  if (loading) {
    return <Loading />;
  }
  if (userNotFound) {
    return <NotFound />;
  }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Order Status</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Shipping Details</th>
              <th className="border px-4 py-2">Order ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
