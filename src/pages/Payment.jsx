import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, QrCode } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import orderService from '../services/orderService';
import { clearCart } from '../store/cartSlice';

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const { items: cartItems } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);

  const orderTotal = cartItems.reduce((total, item) => total + (item.product?.price || item.price) * item.quantity, 0);

  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const storedShippingAddress = localStorage.getItem('shippingAddress');
    if (storedShippingAddress) {
      setShippingAddress(JSON.parse(storedShippingAddress));
    } else {
      navigate('/shipping-details');
    }
  }, [navigate]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert('You must be logged in to place an order.');
      navigate('/login');
      return;
    }

    if (!shippingAddress) {
      alert('Shipping address is missing. Please go back to shipping details.');
      navigate('/shipping-details');
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: item.product?.id || item.id,
      quantity: item.quantity,
      price: item.product?.price || item.price,
    }));

    const orderData = {
      userId: user.id,
      shippingAddress: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}, Phone: ${shippingAddress.phoneNumber}`,
      total: orderTotal,
      paymentMethod: paymentMethod,
      items: orderItems,
    };

    try {
      const response = await orderService.createOrder(orderData, token);
      console.log('Order placed successfully:', response);
      alert('Order Placed Successfully!');
      dispatch(clearCart());
      navigate('/my-orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Complete Your Purchase</h1>

        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-lg">
          {/* Order Summary */}
          <div className="mb-6 pb-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-3">Order Summary</h2>
            <div className="flex justify-between text-lg text-gray-300">
              <span>Total Amount:</span>
              <span className="font-bold text-white">₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800'} text-white hover:border-blue-500 transition-colors`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={28} className="mb-2" />
                <span className="font-medium">Credit/Debit Card</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800'} text-white hover:border-blue-500 transition-colors`}
                onClick={() => setPaymentMethod('upi')}
              >
                <QrCode size={28} className="mb-2" />
                <span className="font-medium">UPI</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800'} text-white hover:border-blue-500 transition-colors`}
                onClick={() => setPaymentMethod('cod')}
              >
                <Banknote size={28} className="mb-2" />
                <span className="font-medium">Cash on Delivery</span>
              </button>
            </div>
          </div>

          {/* Payment Details Form */}
          <form onSubmit={handlePaymentSubmit}>
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-white">Card Details</h3>
                <div>
                  <label htmlFor="cardNumber" className="block text-gray-300 text-sm font-bold mb-2">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-gray-300 text-sm font-bold mb-2">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-gray-300 text-sm font-bold mb-2">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-gray-300 text-sm font-bold mb-2">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                      placeholder="XXX"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Pay with UPI</h3>
                <p className="text-gray-300 mb-4">Scan the QR code or enter your UPI ID to pay.</p>
                {/* Placeholder for QR Code */}
                <div className="w-48 h-48 bg-gray-800 mx-auto flex items-center justify-center rounded-lg mb-4">
                  <QrCode size={64} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  className="shadow appearance-none border border-gray-700 rounded w-full max-w-sm mx-auto py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                  placeholder="Enter your UPI ID (e.g., yourname@bank)"
                />
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Cash on Delivery</h3>
                <p className="text-gray-300">You will pay ₹{orderTotal.toFixed(2)} when your order is delivered.</p>
                <p className="text-sm text-gray-500 mt-2">Please have the exact amount ready.</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
