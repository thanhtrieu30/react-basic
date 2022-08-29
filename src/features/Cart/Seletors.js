import {createSelector} from '@reduxjs/toolkit';

const cartItemsSelector = ( state) => state.cart.cartItem;

//count product

export const cartItemsCountSelector = createSelector(cartItemsSelector,(cartItems) => 
    cartItems.reduce((count,item) => count + item.quantity , 0)
);

// total

export const cartTotalSelector = createSelector(cartItemsSelector,(cartItems) => 
    cartItems.reduce((total,item) => total + item.product.salePrice * item.quantity , 0)
);