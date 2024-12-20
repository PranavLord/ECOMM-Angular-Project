import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'] // Corrected styleUrls
})
export class SellerHomeComponent implements OnInit {
productList:undefined | product[]// Initialize productList as an empty array
productMessage:undefined | string
icon=faTrash;
editIcon=faEdit;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list()
  }
  deleteProduct(id:string){
    console.warn("id selected",id)

    this.product.deleteProduct(id).subscribe(
      (result)=>{
        if(result){
          this.productMessage="Product is Deleted";

          this.list();  
        }

      })

      setTimeout(() => (this.productMessage=undefined),3000)
  }

  list(){
    this.product.productList().subscribe(
      (result) => {
        console.warn(result)
        console.log('Product list:', result);
        this.productList = result;
   })
  }
}
