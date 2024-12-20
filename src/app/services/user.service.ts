import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { Sign } from 'crypto';
import { Observable } from 'rxjs';
import { emit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private  http:HttpClient, private route:Router) { }

  userSignUp(user:SignUp){

    //first line is used to publish the data in the DB
    //second line is used when there is a data and we are just storing the instance in the local storage of the browser for futher use
    this.http.post("http://localhost:3000/user",user,{observe:'response'}).
    subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
    })
    
  }

  userLogin(data:login){
      this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
      {observe:'response'})
      .subscribe((result)=>{
        if(result  && result.body?.length){
          this.invalidUserAuth.emit(false)
          localStorage.setItem('user',JSON.stringify(result.body[0]));
          this.route.navigate(['/']);
        }else{
          this.invalidUserAuth.emit(true);
        }
      })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
