import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartLoading,
  fetchCart,
  removeFromCart,
  updateQuantity,
} from "../../cartSlice";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const loading = useSelector(selectCartLoading);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.productId?.salePrice ?? item.productId?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  if (loading) {
    return <div className="p-6">Loading cart...</div>;
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">My Cart ({totalItems} items)</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Left: Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.productId?.images?.[0]?.url}
                    alt={item.productId?.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Middle: Product Details */}
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.productId?.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.productId?.brand}
                  </p>
                  <p className="text-sm">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="font-bold mt-1">
                    ₹
                    {item.productId?.salePrice != null
                      ? item.productId.salePrice.toFixed(2)
                      : item.productId?.price != null
                      ? item.productId.price.toFixed(2)
                      : "N/A"}
                  </p>
                </div>

                {/* Right: Quantity & Actions */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    className="ml-3 text-red-500 hover:underline"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cart Summary */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-lg font-semibold">
              Total: <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="mt-3 md:mt-0 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105">
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default Cart;
