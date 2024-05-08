import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

export default function OrdersLineChart({ users }: any) {
  const [ordersPerDay, setOrdersPerDay] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, [users]);

  const fetchData = () => {
    const ordersArray = new Array(30).fill(0);

    users.forEach((user: { orders: any[] }) => {
      user.orders.forEach((order: { createdAt: Date; totalAmount: number }) => {
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        if (
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          const dayOfMonth = orderDate.getDate() - 1; // Zero-indexed day of month
          ordersArray[dayOfMonth] += order.totalAmount;
        }
      });
    });

    setOrdersPerDay(ordersArray);
  };

  return (
    <div className="bg-white rounded-[20px] p-4 w-fit shadow ml-2 my-2 flex flex-col">
      <h1 className="text-black font-bold flex ">
        Orders in {new Date().toLocaleString("default", { month: "long" })}
      </h1>
      <div className="">
        <LineChart
          xAxis={[{ data: Array.from({ length: 30 }, (_, i) => i + 1) }]} // Assuming there are 30 days in a month
          series={[
            {
              data: ordersPerDay,
            },
          ]}
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}
