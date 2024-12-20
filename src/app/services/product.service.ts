import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { order, product } from '../data-type';
import { cart } from '../data-type';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData  = new EventEmitter<product [] | []>();
  constructor(private http:HttpClient) { }

  addProduct(data:product){
    console.warn("service called");
    return this.http.post('http://localhost:3000/products',data)
  }

  productList()
  {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`) 
  }

  getProduct(id: string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:product){
    return  this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=6');
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);

  }
  localAddToCart(data:product){

    let cartData= [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }

  }

  removeItemFromCart(productId:string){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);


    }

  }
  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }
  
  getCartList(userId:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId,
      {observe:'response'}).subscribe((result)=>{
        console.warn(result);

        if(result && result.body){
          this.cartData.emit(result.body);
        }
      })

  
  }

  removeToCart(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart(){
    let userStore=localStorage.getItem('user');
    let userData=userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
    let userStore=localStorage.getItem('user');
    let userData=userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  deleteCartItems(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      this.cartData.emit([])
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
  
}
