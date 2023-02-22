import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;

  showTable = false;

  pageNumber: number = 0;

  productDetails: Product[] = [];

  displayedColumns: string[] = ['ID', 'Product Name', 'description', 'Category', 'Discounted Price', 'Actual Price', 'Product Status', 'Actions'];

  constructor(private productService: ProductService,
    private snack: MatSnackBar,
    private router: Router,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if (resp.length == 8) {
            this.showLoadMoreProductButton = true;
          } else {
            this.showLoadMoreProductButton = false;
          }
          resp.forEach(
            product => this.productDetails.push(product)
          );
          this.showTable = true;
          // this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductById(productId).subscribe(
      (resp) => {
        console.log(resp);
        Swal.fire('Product deleted Successfully', 'Success');
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);

    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });

  }

  editProductDetails(productId: number) {
    console.log(productId);

    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }
}
