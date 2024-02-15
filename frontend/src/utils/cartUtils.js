export const addDecimals = (num) =>{
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    // calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    // calculate shipping price(if order is over $100 then shipping is free, else it is $10)
    state.shippingprice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
    // calculate ta  x price 15% tax
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))
    // calculate total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingprice) + Number(state.taxPrice)
    ).toFixed(2)
    localStorage.setItem('cart', JSON.stringify(state))

    return state
}
