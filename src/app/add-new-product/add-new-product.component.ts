import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FileHandle } from '../_model/file_handle.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  isNewProduct = true;

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    category: "",
    discountedPrice: 0,
    productPrice: 0,
    productStatus: "",
    productImages: []
  }

  constructor(private productService: ProductService, private snack: MatSnackBar, private sanitizer: DomSanitizer, private activateRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.product = this.activateRoute.snapshot.data['product'];

    if(this.product && this.product.productId != 0) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    if (this.product.category == '' || this.product.category == null) {

      this.snack.open("Category is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.product.productName == '' || this.product.productName == null) {

      this.snack.open("Product Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.product.productDescription == '' || this.product.productDescription == null) {

      this.snack.open("Product Description is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }

    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);
        Swal.fire('Product added Successfully', 'Success');
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open("Something Went Wrong", 'ok', {
          verticalPosition: 'bottom',
        })
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(fileHandle);

    }
  }

  removeImage(i: number) {
    this.product.productImages.splice(i, 1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }

}
