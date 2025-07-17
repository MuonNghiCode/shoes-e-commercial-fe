export interface Account {
    _id: string;
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
  }

  
  export interface OrderItem {
    _id?: string;
    product: Product; // ID của product
    price: number;
    qty: number;
  }
  
  export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface Order {
    _id: string;
    account: Account; // ID của account
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    brand: string;
    sizes: '38' | '39' | '40' | '41' | '42' | '43' | '44';
    stock: number;
    images: string[];
    category: string;
    averageRating: number;
    numOfReviews: number;
    reviews: Review[]; // chứa mảng ID của review
    createdAt?: string;
    updatedAt?: string;
  }

  export interface Review {
    _id: string;
    account: Account; 
    name: string;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
  }
  