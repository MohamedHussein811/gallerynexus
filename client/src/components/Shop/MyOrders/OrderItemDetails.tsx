import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { OrderItem } from "./Interfaces";
import { DisableRightClick } from "../../../constants/constants";

export const OrderItemDetails = ({
  item,
  index,
}: {
  item: OrderItem;
  index: number;
}) => {

  DisableRightClick();
  return (
    <AccordionItem key={`item-${index}`} value={`item-${index}`}>
      <AccordionTrigger className="custom-link-styling hover:no-underline">
        {item.artwork.title}
      </AccordionTrigger>
      <AccordionContent>
        <li key={item._id}>
          <img
            src={item.artwork.image[0]}
            width={100}
            height={100}
            alt="ItemIMG"
          />
          <p>Artwork Title: {item.artwork.title}</p>
          <p>Category: {item.artwork.category}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
        </li>
      </AccordionContent>
    </AccordionItem>
  );
};
