export interface Artwork {
    _id: string;
    title: string;
    category: string;
    image: string[];
    size: string;
    price: number;
  }
  
export interface OrderItem {
    _id: string;
    artwork: Artwork;
    quantity: number;
    price: number;
  }
  
export interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: {
      name: string;
      address: string;
      country: string;
      city: string;
      state: string;
      zip: string;
      phone: string;
      email: string;
    };
    orderStatus: string;
    createdAt: string;
  }
  