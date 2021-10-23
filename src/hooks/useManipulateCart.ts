import { useQueryClient } from 'react-query';
import { useDebouncedCallback } from 'use-debounce';
import {
  ILocalCart,
  ILocalCartItem,
} from '../../lib/interfaces/cart/ILocalCart';
import { LOCAL_STORAGE_CART_KEY, NEW_CART_VALUE } from '../constants';

const useManipulateCart = () => {
  const queryClient = useQueryClient();

  const invalidateTheCart = useDebouncedCallback(
    () => {
      queryClient.invalidateQueries('/validate-cart-items');
    },
    400,
    { leading: true }
  );

  if (typeof window !== 'undefined') {
    let localCart: ILocalCart = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) as string
    );
    // Check if cart key exists in local storage
    if (!localCart) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(NEW_CART_VALUE)
      );
      localCart = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_CART_KEY) as string
      );
    }

    const isCartEmpty = () => {
      if (localCart.items.length === 0) {
        return true;
      }
      return false;
    };
    // 🎉 Add to cart
    const addToCart = async (
      newItem: ILocalCartItem,
      restaurant_id: number
    ) => {
      console.log(newItem, 'new cart item');
      // If the cart is empty, then we initialize a cart with a restaurant id
      if (isCartEmpty()) {
        const newCart: ILocalCart = {
          restaurant_id,
          items: [newItem],
        };
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
        invalidateTheCart();
      } else {
        // If the cart exists, then we check if the added item belongs to the same restautant.
        if (restaurant_id !== localCart.restaurant_id) {
          //💀 Create new cart with new restaurant.
        } else {
          // Check if the item exists in the cart
          const existingItemIndex = localCart.items.findIndex(
            i => i.id === newItem.id
          );

          //  if the item doesn't exist in the cart, add it
          if (existingItemIndex === -1) {
            const newCart: ILocalCart = {
              restaurant_id: localCart.restaurant_id,
              items: [...localCart.items, newItem],
            };
            localStorage.setItem(
              LOCAL_STORAGE_CART_KEY,
              JSON.stringify(newCart)
            );
            invalidateTheCart();
          } else {
            // If item exists
            incrementQuantity(newItem.id, newItem.quantity);
          }
        }
      }
    };

    // ➕ Increment Item
    const incrementQuantity = (id: number, q?: number) => {
      try {
        // Get the desired item index
        const oldItemIndex = localCart.items.findIndex(i => i.id === id);

        if (oldItemIndex !== -1) {
          // copy the old cart
          const newCart: ILocalCart = {
            restaurant_id: localCart.restaurant_id,
            items: [...localCart.items],
          };

          // increment the quantity in the new array
          newCart.items[oldItemIndex].quantity =
            newCart.items[oldItemIndex].quantity + (q ?? 1);
          //set the new array to the local storage and validate the cart
          localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
          invalidateTheCart();
        }
      } catch (err) {
        console.error(err);
      }
    };

    // ➖ Decrement Item
    const decrementQuantity = (id: number) => {
      try {
        // Get the desired item index
        const oldItemIndex = localCart.items.findIndex(i => i.id === id);
        if (oldItemIndex !== -1) {
          // copy the old cart
          const newCart: ILocalCart = {
            restaurant_id: localCart.restaurant_id,
            items: [...localCart.items],
          };
          // decrement the quantity in the new array
          newCart.items[oldItemIndex].quantity--;
          //set the new array to the local storage and validate the cart
          localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
          invalidateTheCart();
        }
      } catch (err) {
        console.error(err);
      }
    };

    // ❌ Remove From Cart
    const removeFromCart = (id: number) => {
      const newCart: ILocalCart = {
        restaurant_id: localCart.restaurant_id,
        items: localCart.items.filter(cartItem => cartItem.id !== id),
      };

      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
      invalidateTheCart();
    };
    return { addToCart, removeFromCart, incrementQuantity, decrementQuantity };
  }
  return {};
};

export default useManipulateCart;
