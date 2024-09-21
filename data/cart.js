export let cart = [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 },
  { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1 },
];
export function addtocart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({ productId: productId, quantity: 1 });
  }
}
export function updatecartquantity() {
  let totQuant = 0;
  cart.forEach((cartItem) => {
    totQuant += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = totQuant;
}

export function deletecartitem(productId1){
const newArray = []
  cart.forEach((item)=>{
    if(item.productId==productId1){
    }
    else{
        newArray.push(item);
    }
  })
  cart = newArray;
}
