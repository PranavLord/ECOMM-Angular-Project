export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string
    
}

export interface product{
    Name:string,
    Price:number,
    Image:string,
    Description:string,
    Color:string,
    Category:string,
    id:string
    quantity: undefined | number
    productId: undefined | number
}

export interface cart{
    Name:string,
    Price:number,
    Image:string,
    Description:string,
    Color:string,
    Category:string,
    id:string | undefined,
    quantity: undefined | number,
    userId:undefined | number,
    productId:string
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number | undefined
}