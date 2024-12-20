import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{
  menuType: string='default';
  sellerName: string='';
  userName: string='';
  searchResult: undefined |product[];
  cartItems=0;
  constructor(private route:Router, private product:ProductService) {
    
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            let sellerStore= localStorage.getItem('seller');
            let sellerData=sellerStore && JSON.parse(sellerStore);

            if (Array.isArray(sellerData)) {
              // Handle array case if seller data is stored as an array
              if (sellerData.length > 0) {
                this.sellerName = sellerData[0].name; // Assuming seller data is in the first index
              }
            }else{
              this.sellerName = sellerData.name;

            }
            this.menuType='seller';
        }else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType='user';
            this.product.getCartList(userData.id)
        }
        else{
          console.warn("outside seller area")
          this.menuType='default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })

  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userlogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }



  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      const searchValue = element.value.trim();
      this.product.searchProducts(searchValue).subscribe((result)=>{
          console.warn(result);
          if(result.length>5)
          {
            result.length=5
          }
          
          this.searchResult=result;
          
      });
    }

  }

  redirectToDetails(id:string){
    this.route.navigate(['/details/'+id])
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  submitSearch(val:  string){
    this.route.navigate([`search/${val}`])
  }
}




