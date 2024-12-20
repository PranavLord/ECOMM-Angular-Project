import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMsg:string |undefined;

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {
      this.product.currentCart().subscribe((result) =>{
        let price=0;
        this.cartData=result;
        result.forEach((item) =>{
          if(item.quantity){
            price=price+ (+item.Price* +item.quantity)
          }
        })

        this.totalPrice=price+(price/10)+100-(price/10);

        console.warn(this.totalPrice);
      })

    
  }


  orderNow(data:order){
    console.warn(data);

    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item) => {
          // Only call deleteCartItems if id is not undefined
          setTimeout (()=>{
            item.id && this.product.deleteCartItems(item.id);
          },800);
  
      });

      this.product.orderNow(orderData).subscribe((result) =>{
        if(result){
          
          this.orderMsg="Your Order has been placed successfully"
          setTimeout(() =>{
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          },4000);
        }
      })
    }


  }

}
