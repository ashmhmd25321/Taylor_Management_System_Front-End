import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{

  constructor(private productService: ProductService, private imageProcessing: ImageProcessingService) { }



  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {

    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductDetailsById(id)
        .pipe(
          map(p => this.imageProcessing.createImages(p))
        )
    } else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: 0,
      productName: "",
      productDescription: "",
      category: "",
      discountedPrice: 0,
      productPrice: 0,
      productStatus: "",
      productImages: []
    }
  }
}
