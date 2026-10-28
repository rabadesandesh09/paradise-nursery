import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';
import '../App.css';

// cost is stored like "$15", so convert it to a number
const parseCost = (cost) => parseFloat(String(cost).replace('$', ''));

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // subtotal for a single plant type
  const calculateTotalCost = (item) => parseCost(item.cost) * item.quantity;

  // total cost of all items in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  // total number of plants in the cart
  const calculateTotalQuantity = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // quantity would reach 0, so remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping Cart</h2>
      <h3>Total Items: {calculateTotalQuantity()}</h3>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue-shopping-buttons">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
