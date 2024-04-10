import { Accordion } from "../../ui/accordion";
import { OrderItemDetails } from "./OrderItemDetails";
import { Order } from "./Interfaces";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return (
      <span>
        {formattedDate}
        <br />
        {formattedTime}
      </span>
    );
  };
export const OrderDetails = ({ order }: { order: Order }) => (
    
  <tr key={order._id}>
    <td className="border px-4 py-2">
      <Accordion type="single" collapsible>
        {order.items.map((item, index) => (
          <OrderItemDetails key={index} item={item} index={index} />
        ))}
      </Accordion>
    </td>
    <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
    <td className="border px-4 py-2">{order.orderStatus}</td>
    <td className="border px-4 py-2">{formatDate(order.createdAt)}</td>
    <td className="border px-4 py-2">
      <div>Name: {order.shippingAddress.name}</div>
      <div>Address: {order.shippingAddress.address}</div>
      <div>Country: {order.shippingAddress.country}</div>
      <div>City: {order.shippingAddress.city}</div>
      <div>State: {order.shippingAddress.state}</div>
      <div>ZIP: {order.shippingAddress.zip}</div>
      <div>Phone: {order.shippingAddress.phone}</div>
      <div>Email: {order.shippingAddress.email}</div>
    </td>
    <td className="border px-4 py-2">{order._id}</td>

  </tr>
);
