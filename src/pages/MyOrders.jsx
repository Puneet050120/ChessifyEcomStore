import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
import orderService from "../services/orderService";

export default function MyOrders() {
    const { user, token } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            console.log('MyOrders useEffect - user:', user, 'token:', token);
            if (!user || !token) {
                setError('Please log in to view your orders.');
                setLoading(false);
                return;
            }
            try {
                const userOrders = await orderService.getUserOrders(user.id, token);
                setOrders(userOrders);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to fetch orders. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container py-16">
                    <h1 className="text-3xl font-bold mb-4">My Orders</h1>
                    <p>Loading orders...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="container py-16">
                    <h1 className="text-3xl font-bold mb-4">My Orders</h1>
                    <p className="text-red-500">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-16">
                <h1 className="text-3xl font-bold mb-4">My Orders</h1>
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="border p-4 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                                <p>Total: ${order.total ? order.total.toFixed(2) : 'N/A'}</p>
                                <p>Status: {order.status}</p>
                                <p>Shipping Address: {order.shippingAddress}</p>
                                <p>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <div className="mt-2">
                                    <h3 className="text-lg font-medium">Items:</h3>
                                    <ul className="list-disc pl-5">
                                        {order.items && order.items.map((item) => (
                                            <li key={item.id}>{item.product ? item.product.name : 'Unknown Product'} (x{item.quantity}) - ${item.price ? item.price.toFixed(2) : 'N/A'}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
