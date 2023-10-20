const addDec = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDec(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.shippingPrice = addDec(state.itemsPrice > 2000 ? 120 : 60);

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) 
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  
  return state;
};
