import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeFromCart } from "../../services/operations/cartApi";
import Loader from "../Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.profile.token);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (token) {
      dispatch(getCartItems(token));
    }
  }, [dispatch, token]);

  const total = cartItems.reduce((acc, item) => acc + (item.courseId ? item.courseId.price : 0), 0);

  const deleteHandler = (courseId) => {
    dispatch(removeFromCart(courseId, token));
  };

  return (
    <div className="bg-richblack-900 text-white min-h-screen p-4 sm:p-6 lg:p-8 text-left">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
            <div className="w-full lg:w-[60%]">
              <h1 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-8">Your Cart</h1>
              <p className="opacity-80 mb-6 md:mb-8 text-sm md:text-base">
                {cartItems.length} Courses in Cart
              </p>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col border-t border-[#2C333F] py-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-[180px] h-[180px] sm:h-[120px] flex-shrink-0">
                      <img
                        src={item.courseId.thumbnail}
                        alt={item.courseId.courseName}
                        className="w-full h-fit rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-grow space-y-2">
                      <h3 className="text-lg font-semibold">
                        {item.courseId.courseName}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {item.courseId.courseDescription}
                      </p>
                      <p className="text-sm text-gray-400">{item.courseId.whatYouWillLearn}</p>
                      <p className="font-medium text-[#FFD608] text-sm">
                        {item.courseId.courseContent.length} Sections
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end sm:gap-6">
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2C2F36] text-red-400 hover:bg-[#3a3f47] transition-colors text-sm font-medium"
                      onClick={() => deleteHandler(item.courseId._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>Remove</span>
                    </button>

                    <p className="font-semibold text-[#FFD608] text-lg">
                      ${item.courseId.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#161D29] w-full lg:w-[280px] h-fit rounded-lg p-4 sm:p-6 flex flex-col sticky top-4">
              <p className="text-gray-400 text-sm">Total:</p>
              <p className="font-semibold text-[#FFD608] text-2xl mt-1 mb-4">
                ${total.toFixed(2)}
              </p>
              <button 
                className="w-full bg-[#CBAA0B] hover:bg-[#b39609] text-black font-medium py-3 px-4 rounded-lg transition-colors text-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
