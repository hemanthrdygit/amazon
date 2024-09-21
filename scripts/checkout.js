import { cart, deletecartitem } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatcurrency } from "./utils/money.js";
import { deliveryoptions } from "../data/deliveryOptions.js";
const today = dayjs();

const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

let checkouthtml = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((item) => {
    if (item.id == productId) {
      matchingProduct = item;
    }
  });
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryoption;
  deliveryoptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
        deliveryoption = option;
    }
  })
  const deliveryDate = today.add(deliveryoption.deliveryDays, "days");
const datestring = deliveryDate.format("dddd, MMMM D");

  const html = `<div class="cart-item-container js-cart-item-${
    matchingProduct.id
  }">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${formatcurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary "data-product-id=${
                    matchingProduct.id
                  }>
                    Delete
                  </span>
                </div>
              </div>
             <div class="delivery-options">
             <div class="delivery-options-title">Choose a delivery option :
             </div>
             ${deliveryoptionshtml(matchingProduct, cartItem)}
             </div>
              </div>
            </div>
          </div>`;
  checkouthtml += html;
});

document.querySelector(".order-summary").innerHTML = checkouthtml;
console.log(document.querySelectorAll(".delete-quantity-link"));
document.querySelectorAll(".delete-quantity-link").forEach((i) => {
  i.addEventListener("click", () => {
    const productId = i.dataset.productId;
    deletecartitem(productId);

    const container = document.querySelector(`.js-cart-item-${productId}`);
    container.remove();
  });
});
function deliveryoptionshtml(matchingProduct, cartItem) {
  let html = "";
  deliveryoptions.forEach((deliveryoption) => {
    const today = dayjs();
    console.log(deliveryoption.deliveryDays);
    const deliveryDate = today.add(deliveryoption.deliveryDays, "days");
    const datestring = deliveryDate.format("dddd, MMMM D");
    const pricestring =
      deliveryoption.priceCents === 0
        ? "Free"
        : `$${formatcurrency(deliveryoption.priceCents)} - `;
    const ischecked = deliveryoption.id === cartItem.deliveryOptionId;

    html += ` <div class="delivery-option">
                  <input type="radio" ${ischecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring}
                    </div>
                  </div>
                </div>`;
  });
  return html;
}
