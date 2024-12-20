import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements  OnInit{

  searchResult:undefined|product[];
  message:undefined|string;
  constructor (private activeRoute: ActivatedRoute,  private product: ProductService) {

  }

  ngOnInit(): void {
      let query  =this.activeRoute.snapshot.paramMap.get('query');
      query && this.product.searchProducts(query).subscribe((result)=>{
            this.searchResult=result;

            if (!this.searchResult || this.searchResult.length === 0) {
              this.message= "Required Result Not Found!!! Please Re-Define Your Product";
            }
      })
  }

  

}
