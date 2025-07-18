export interface Account {
  _id: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

// User alias for Account
export type User = Account;

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
  sizes: "38" | "39" | "40" | "41" | "42" | "43" | "44";
  stock: number;
  images: string[]; // Array of strings for multiple images
  category: string;
  averageRating: number;
  numOfReviews: number;
  review: string[]; // Array of review IDs (ObjectId refs)
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  account: Account; // Changed from Account to string (account ID)
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}
