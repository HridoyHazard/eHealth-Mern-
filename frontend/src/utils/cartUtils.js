const addDec = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDec(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.shippingPrice = addDec(state.itemsPrice > 100 ? 0 : 10);

  state.taxPrice = addDec(Number((0.15 * state.itemsPrice).toFixed(2)));

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
