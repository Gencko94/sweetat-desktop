import { useQueryClient } from 'react-query';
import { useDebouncedCallback } from 'use-debounce';
import {
  CART_RESTAURANT,
  ILocalCart,
  ILocalCartItem,
} from '../../lib/interfaces/cart/ILocalCart';
import { getLocalCart } from '../../utils/getLocalCart';
import { LOCAL_STORAGE_CART_KEY, NEW_CART_VALUE } from '../constants';
import { useApplicationState } from '../contexts/ApplicationContext';

const useManipulateCart = () => {
  const queryClient = useQueryClient();
  const [, setState] = useApplicationState();
  const invalidateTheCart = useDebouncedCallback(
    () => {
      queryClient.invalidateQueries('/validate-cart-items');
    },
    400,
    { leading: true }
  );

  if (typeof window !== 'undefined') {
    let localCart = getLocalCart();
    // Check if cart key exists in local storage
    if (!localCart) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(NEW_CART_VALUE)
      );
      localCart = getLocalCart();
    }

    const isCartEmpty = () => {
      if (localCart.items.length === 0) {
        return true;
      }
      return false;
    };
    const doItemsMatch = (arr1: ILocalCartItem, arr2: ILocalCartItem) => {
      const array1Sorted = arr1.selectedaddons
        .slice()
        .sort((a, b) => a.addon_id - b.addon_id);
      const array2Sorted = arr2.selectedaddons
        .slice()
        .sort((a, b) => a.addon_id - b.addon_id);
      if (
        arr1.selectedaddons.length === arr2.selectedaddons.length &&
        array1Sorted.every(function(value, index) {
          return value.addon_id === array2Sorted[index].addon_id;
        })
      ) {
        return true;
      }
      return false;
    };
    const clearTheCart = () => {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(NEW_CART_VALUE)
      );
      localCart = getLocalCart();
    };

    // 🎉 Add to cart
    const addToCart = async (
      newItem: ILocalCartItem,
      restaurant: CART_RESTAURANT
    ) => {
      // If the cart is empty, then we initialize a cart with a restaurant id
      if (isCartEmpty()) {
        const newCart: ILocalCart = {
          restaurant: restaurant,
          items: [newItem],
        };
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
        queryClient.invalidateQueries('/validate-cart-items');
      } else {
        // If the cart exists, then we check if the added item belongs to the same restautant.
        if (restaurant.id !== localCart.restaurant?.id) {
          //💀 Show Cart alert then Create new cart with new restaurant.
          setState(prev => ({
            ...prev,
            cartAlertState: {
              open: true,
              cb: () => {
                clearTheCart();
                addToCart(newItem, restaurant);
              },
            },
          }));
        } else {
          // Check if the item exists in the cart

          const existingItemIndex = localCart.items.findIndex(i => {
            if (i.id === newItem.id && doItemsMatch(i, newItem)) {
              return true;
            }

            return false;
          });

          //  if the item doesn't exist in the cart, add it
          if (existingItemIndex === -1) {
            const newCart: ILocalCart = {
              restaurant: localCart.restaurant,
              items: [...localCart.items, newItem],
            };
            localStorage.setItem(
              LOCAL_STORAGE_CART_KEY,
              JSON.stringify(newCart)
            );
            invalidateTheCart();
          } else {
            incrementQuantity(newItem, newItem.quantity);
            invalidateTheCart();
          }
        }
      }
    };

    // ➕ Increment Item
    const incrementQuantity = (item: ILocalCartItem, q?: number) => {
      try {
        // Get the desired item index
        const existingItemIndex = localCart.items.findIndex(i => {
          if (i.id === item.id && doItemsMatch(i, item)) {
            return true;
          }

          return false;
        });
        if (existingItemIndex !== -1) {
          // copy the old cart
          const newCart: ILocalCart = {
            restaurant: localCart.restaurant,
            items: [...localCart.items],
          };

          // increment the quantity in the new array
          newCart.items[existingItemIndex].quantity =
            newCart.items[existingItemIndex].quantity + (q ?? 1);
          //set the new array to the local storage and validate the cart
          localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
          invalidateTheCart();
        }
      } catch (err) {
        console.error(err);
      }
    };

    // ➖ Decrement Item
    const decrementQuantity = (item: ILocalCartItem) => {
      try {
        // Get the desired item index

        const existingItemIndex = localCart.items.findIndex(i => {
          if (i.id === item.id && doItemsMatch(i, item)) {
            return true;
          }

          return false;
        });

        if (existingItemIndex !== -1) {
          // copy the old cart
          const newCart: ILocalCart = {
            restaurant: localCart.restaurant,
            items: [...localCart.items],
          };
          // decrement the quantity in the new array
          newCart.items[existingItemIndex].quantity--;
          //set the new array to the local storage and validate the cart
          localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
          invalidateTheCart();
        }
      } catch (err) {
        console.error(err);
      }
    };

    // ❌ Remove From Cart
    const removeFromCart = (item: ILocalCartItem) => {
      const existingItemIndex = localCart.items.findIndex(i => {
        if (i.id === item.id && doItemsMatch(i, item)) {
          return true;
        }

        return false;
      });

      const newCart: ILocalCart = {
        restaurant: localCart.restaurant,
        items: [...localCart.items],
      };
      newCart.items.splice(existingItemIndex, 1);
      if (newCart.items.length === 0) {
        // Clear the cart and reset the global cart restaurant state
        clearTheCart();
        setState(prev => ({
          ...prev,
          cart_restaurant: null,
        }));
      } else {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCart));
      }
      invalidateTheCart();
    };
    return { addToCart, removeFromCart, incrementQuantity, decrementQuantity };
  }
  return {};
};

export default useManipulateCart;
