import { FileHandle } from "./file_handle.model";

export interface Product {
    productId: number,
    productName: string,
    productDescription: string,
    category: string,
    discountedPrice: number,
    productPrice: number,
    productStatus: string,
    productImages: FileHandle[]
}