import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex = 0;

  product!: Product;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }


  ngOnInit(): void {
    this.product = this.activateRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(index: any) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true,
      id: productId
    }]);
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Product added to Cart Successfully', 'Success');
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
