import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails {
    fullName: string,
    address: string,
    contactNumber: string,
    alternateContactNumber: string,
    orderProductQuantities: OrderQuantity[];
}