import { OrderStatus } from "../enum";
import { Medicine } from "./medicine.interface";
import { User, UserAddress } from "./user.interface";

export interface Order {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: {
    name: string;
    thumbnail: {
      publicId: string;
      url: string;
      alt: string;
    };
  };
}

export interface OrderDelivery {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderDeliverItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  user: User;
}

export interface OrderDeliverItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: Medicine;
}
