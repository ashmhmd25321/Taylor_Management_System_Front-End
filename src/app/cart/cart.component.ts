import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private productService: ProductService, private router: Router) {
  }


  ngOnInit(): void {
    this.getCartDetails();
  }

  displayedColumns: string[] = ['name', 'description', 'price', 'discountedPrice', 'action'];
  cartDetails: any = [];

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response:any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  checkout() {

    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  delete(cartId:any) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resonse) => {
        Swal.fire('Cart Item deleted Successfully', 'Success');
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
