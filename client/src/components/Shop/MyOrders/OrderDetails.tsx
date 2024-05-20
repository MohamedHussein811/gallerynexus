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
export default function OrderDetails(order:any){    
  return <tr key={order._id}>
    {/*<td className="border px-4 py-2">
      <Accordion type="single" collapsible>
        {order.order.items.map((item:any, index:number) => (
          <OrderItemDetails key={item._id} item={item} index={index} />
        ))}
      </Accordion>
    </td>*/}
    <td className="border px-4 py-2">${order.order.totalAmount.toFixed(2)}</td>
    <td className="border px-4 py-2">{order.order.orderStatus}</td>
    <td className="border px-4 py-2">{formatDate(order.order.createdAt)}</td>
    <td className="border px-4 py-2">
      <div>Name: {order.order.shippingAddress.name}</div>
      <div>Address: {order.order.shippingAddress.address}</div>
      <div>Country: {order.order.shippingAddress.country}</div>
      <div>City: {order.order.shippingAddress.city}</div>
      <div>State: {order.order.shippingAddress.state}</div>
      <div>ZIP: {order.order.shippingAddress.zip}</div>
      <div>Phone: {order.order.shippingAddress.phone}</div>
      <div>Email: {order.order.shippingAddress.email}</div>
    </td>
    <td className="border px-4 py-2">{order.order._id}</td>

  </tr>
}
