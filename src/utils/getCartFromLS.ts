import {CartItem} from "../redux/cartSlice/cartTypes";
import {calcTotalPrice} from "../utils/calcTotalPrice";


export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
