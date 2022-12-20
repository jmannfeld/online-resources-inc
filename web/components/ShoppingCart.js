import React, { useContext, useEffect } from 'react';
import { FiTrash, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import styles from './ShoppingCart.module.css';
import PaypalCheckoutButton from './PayPalCheckoutButton';
import { CartContext } from './CartContext';
import ShoppingCartItem from './ShoppingCartItem';

export default function ShoppingCart() {
  const [cart, setCart] = useContext(CartContext);
  console.log('ShoppingCart', cart);

  const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.discountedPrice * curr.qty, 0);
  console.log('totalPrice', totalPrice);

  // remove shipping from accessories if applicable
  const removeShipping = cart.find((x) => x.removeShipping === true) || null;
  const totalShipping = removeShipping
    ? removeShipping.shipping
    : cart.reduce((acc, curr) => acc + curr.shipping * curr.qty, 0);
  console.log('removeShipping', removeShipping);
  let shippingPriceOfAccessories = cart.reduce((acc, curr) => acc + curr.shipping * curr.qty, 0);
  if (removeShipping) {
    shippingPriceOfAccessories =
      shippingPriceOfAccessories - removeShipping.shipping * removeShipping.qty;
  }
  console.log('shippingPriceOfAccessories', shippingPriceOfAccessories);

  // apply discounts if applicable
  const addDiscount = cart.find((x) => x.addDiscount === true) || null;
  let discount;
  let discountedItems = [];
  console.log('addDiscount', addDiscount);

  if (addDiscount) {
    discount = Number(addDiscount.discount);
    discountedItems = [...addDiscount.discountedProducts];
    console.log('discountedItems', discountedItems);
  }

  useEffect(() => {
    // localStorage.setItem('cart', JSON.stringify(cart));
    if (discount && discountedItems.length > 0) {
      setCart(
        cart.map((x) =>
          discountedItems.includes(x.name)
            ? {
                ...x,
                discountedPrice:
                  x.price * x.qty - (Number(x.price * x.qty) * Number(discount)) / 100
              }
            : x
        )
      );
    }
  }, [discount]);

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>{`Shopping Cart (${totalQty})`}</h1>
      <FiTrash className={styles.trashCart} onClick={emptyCart} title="Empty cart" />
      {cart.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cart.map((cartItem, ix) => (
              <ShoppingCartItem
                item={cartItem}
                discount={discountedItems.includes(cartItem.name) ? discount : null}
                key={`${cartItem.name}-${ix}`}
              />
            ))}
          </div>
          <div className={styles.cartSubtotal}>
            <p>Estimated Shipping: ${parseFloat(totalShipping).toFixed(2)}</p>
            {removeShipping && shippingPriceOfAccessories > 0 && (
              <p className={styles.shippingPriceOfAccessories}>
                You saved ${shippingPriceOfAccessories} on shipping!
              </p>
            )}
            <p>
              Subtotal ({totalQty} item{totalQty > 1 ? 's' : ''}):{' '}
              <b>${parseFloat(totalPrice).toFixed(2)}</b>
            </p>
          </div>
          <PaypalCheckoutButton />
        </>
      ) : (
        <div className={styles.emptyCartPlaceholder}>
          <FiShoppingCart size="2rem" className={styles.cartIcon} />
          <p className={styles.emptyCartHeading}>Your Cart is Empty</p>
          <p className={styles.emptyCartSubheading}>Shop for products to add to your cart</p>
          <Link
            href={{
              pathname: '/LandingPage',
              query: { slug: 'products' }
            }}
            as={`/products`}
          >
            <a className={styles.cartProductButton}>View our Products</a>
          </Link>
        </div>
      )}
    </div>
  );
}
