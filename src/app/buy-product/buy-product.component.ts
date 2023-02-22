import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderDetails } from '../_model/order-detail.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    address: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantities: []
  }

  constructor(private activatedRoute: ActivatedRoute, private snack: MatSnackBar, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantities.push(
        { productId: x.productId, quantity: 1 }
      )
    );


    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {

    if (this.orderDetails.fullName == '' || this.orderDetails.fullName == null) {

      this.snack.open("Fullname is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.orderDetails.address == '' || this.orderDetails.address == null) {

      this.snack.open("Address Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.orderDetails.contactNumber == '' || this.orderDetails.contactNumber == null) {
      this.snack.open("Contact number is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.orderDetails.alternateContactNumber == '' || this.orderDetails.alternateContactNumber == null) {
      this.snack.open("Alternate Contact number is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }

    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        Swal.fire('Order placed Successfully. It will get delivered to you within 4-5 business days', 'success');
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err);
        this.snack.open("Something Went Wrong", 'ok', {
          verticalPosition: 'bottom',
        })
      }
    )
  }

  getQuantityForProduct(productId: number) {
    const filterProduct = this.orderDetails.orderProductQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filterProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, discountedPrice: number) {
    const filteredProduct = this.orderDetails.orderProductQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * discountedPrice;
  }

  onQuantityChanged(quantity: any, productId: number) {
    this.orderDetails.orderProductQuantities.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quantity;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantities.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].discountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }

}
