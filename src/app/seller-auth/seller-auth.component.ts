import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent  implements OnInit{

  constructor (private seller:SellerService,private router:Router){}
  showLogin=false
  authError:string='';
  ngOnInit():void{
    this.seller.reloadSeller()
  }

  signUp(data:SignUp){
    this.seller.userSignUp(data)
  }

  login(data: SignUp) {
    this.authError = ""; // Reset authError when user attempts to login again
    console.warn(data);
    this.seller.userLogin(data);
    
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is not correct";
        
        // Set a timeout to clear authError after 5 seconds
        setTimeout(() => {
          this.authError = "";
        }, 5000);
      }
    });
  }
  


  openLogin(){
    this.showLogin=true
  }

  openSignUp(){
    this.showLogin=false
  }


}
