export const cart = [];
export function addtocart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId==cartItem.productId){
            matchingItem = cartItem;
        }
    })
    if(matchingItem){
        matchingItem.quantity++;
    }
    else{
        cart.push({productId: productId ,quantity:1});
    }
     
}
export function updatecartquantity(){
    let totQuant=0;
    cart.forEach((cartItem)=>{
        totQuant+=cartItem.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = totQuant;
}