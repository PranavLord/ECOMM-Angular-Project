import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
 addProductMessage: string | undefined;
  constructor(private product: ProductService){}

  submit(data:product){
    console.warn(data);
    this.product.addProduct(data).subscribe((result)=>{
        console.warn(result);
        if(result){
          this.addProductMessage="Product Is Successfully Added"
        }
        setTimeout(() => (this.addProductMessage=undefined),3000)
    })
  }



}
