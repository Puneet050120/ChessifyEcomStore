import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import orderService from "../services/orderService";
import { clearCart } from "../store/cartSlice";

export default function Checkout() {
    const [shippingAddress, setShippingAddress] = useState('');
    const { user, token } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!user || !token) {
            alert('Please log in to place an order.');
            navigate('/login');
            return;
        }
        if (cartItems.length === 0) {
            alert('Your cart is empty.');
            navigate('/shop');
            return;
        }
        if (!shippingAddress) {
            alert('Please enter a shipping address.');
            return;
        }

        try {
            // Assuming the backend calculates total and includes cart items based on userId
            const order = await orderService.createOrder(user.id, shippingAddress, token);
            console.log('Order placed successfully:', order);
            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/'); // Redirect to home or an order confirmation page
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-16">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <form onSubmit={handlePlaceOrder} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="shippingAddress" className="block text-gray-700 text-sm font-bold mb-2">Shipping Address:</label>
                        <textarea
                            id="shippingAddress"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your shipping address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </>
    );
}
  