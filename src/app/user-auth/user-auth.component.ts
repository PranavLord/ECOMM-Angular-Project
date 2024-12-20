import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})

export class UserAuthComponent implements OnInit{
  showLogin: boolean = true;
  authError:string="";
  constructor(private user:UserService, private product:ProductService){}

  ngOnInit(): void {

    this.user.userAuthReload();
    
  }

  signUp(data:SignUp){
      this.user.userSignUp(data)
  }

  login(data: login) {
    this.authError = "";
    this.user.userLogin(data);
    
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("apple", result);
      if (result) {
        this.authError = "Please Enter Valid Credentials";
        
        // Set a timeout to clear the error after 5 seconds
        setTimeout(() => {
          this.authError = "";
        }, 5000);
      }else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 500);
      }
    });
  }
  
  openSignUp(){
    this.showLogin=false;
  }

  openLogin(){
    this.showLogin=true;
  }
  localCartToRemoteCart(){
      let  data= localStorage.getItem('localCart');
      let user=localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      if(data){
        let cartDataList: product[]=  JSON.parse(data);
        
        console.warn(userId);

        cartDataList.forEach((product:product,index)=>{
          let cartData: cart={
            ...product,
            productId: product.id,
            userId
          };
          console.warn(userId);
          delete cartData.id;
          setTimeout(() =>{
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
                console.warn("Item stored in DB");
              }
            })

            if(cartDataList.length===index+1){
              localStorage.removeItem('localCart');
            }
          },500); 
        });
      }

      setTimeout(() =>{
        this.product.getCartList(userId);
      },1000);
  }
  
}



