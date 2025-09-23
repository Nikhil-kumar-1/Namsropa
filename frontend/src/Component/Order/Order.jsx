import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          const mockOrders = [
            {
              id: 'ORD-001',
              date: '2024-01-15',
              status: 'delivered',
              total: 299.97,
              items: [
                {
                  id: 1,
                  name: 'Elegant Evening Gown',
                  price: 149.99,
                  quantity: 1,
                  image: '/images/dress1.jpg',
                  size: 'M',
                  color: 'Black'
                },
                {
                  id: 2,
                  name: 'Summer Floral Dress',
                  price: 74.99,
                  quantity: 2,
                  image: '/images/dress2.jpg',
                  size: 'S',
                  color: 'Blue'
                }
              ]
            },
            {
              id: 'ORD-002',
              date: '2024-01-10',
              status: 'processing',
              total: 189.98,
              items: [
                {
                  id: 3,
                  name: 'Casual Cotton Dress',
                  price: 94.99,
                  quantity: 2,
                  image: '/images/dress3.jpg',
                  size: 'L',
                  color: 'White'
                }
              ]
            },
            {
              id: 'ORD-003',
              date: '2024-01-05',
              status: 'shipped',
              total: 124.99,
              items: [
                {
                  id: 4,
                  name: 'Party Cocktail Dress',
                  price: 124.99,
                  quantity: 1,
                  image: '/images/dress4.jpg',
                  size: 'XS',
                  color: 'Red'
                }
              ]
            },
            {
              id: 'ORD-004',
              date: '2023-12-20',
              status: 'delivered',
              total: 349.95,
              items: [
                {
                  id: 5,
                  name: 'Winter Wool Dress',
                  price: 174.99,
                  quantity: 2,
                  image: '/images/dress5.jpg',
                  size: 'M',
                  color: 'Green'
                }
              ]
            }
          ];
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your orders</h2>
          <Link to="/login" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 mt-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Orders</h1>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {['all', 'processing', 'shipped', 'delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    filter === status
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {status === 'all' ? 'All Orders' : getStatusText(status)}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't placed any orders yet."
                  : `No ${filter} orders found.`
                }
              </p>
              {filter === 'all' && (
                <Link 
                  to="/products" 
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 inline-block"
                >
                  Start Shopping
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-semibold text-gray-800">Order {order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80?text=Dress';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">${item.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium">
                          Track Order
                        </button>
                        {order.status === 'delivered' && (
                          <button className="text-green-600 hover:text-green-700 font-medium">
                            Buy Again
                          </button>
                        )}
                      </div>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                        Need Help?
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Order Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
              <div className="text-gray-600 text-sm">Total Orders</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-gray-600 text-sm">Delivered</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'shipped').length}
              </div>
              <div className="text-gray-600 text-sm">Shipped</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'processing').length}
              </div>
              <div className="text-gray-600 text-sm">Processing</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;