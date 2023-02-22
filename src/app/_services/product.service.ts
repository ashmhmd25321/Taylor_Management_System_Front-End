import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../_model/order-detail.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_OF_API = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(this.PATH_OF_API + "/addProduct", product);
  }

  public getAllProducts(pageNumber:number, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + "/getAllProducts?pageNumber="+pageNumber + "&searchKey="+searchKeyword);
  }

  public deleteProductById(productId: number) {
    return this.httpClient.delete(this.PATH_OF_API + "/deleteProductDetails/"+productId);
  }

  public getProductDetailsById(productId: any) {
    return this.httpClient.get<Product>(this.PATH_OF_API + "/getProductDetailsById/"+productId);
  }

  public getProductDetails(isSingleProductCheckout: any, productId: any) {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + "/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails) {
    return this.httpClient.post(this.PATH_OF_API + "/placeOrder", orderDetails);
  }
}
