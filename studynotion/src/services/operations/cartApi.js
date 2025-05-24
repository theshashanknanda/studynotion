import { setLoading } from "../../reducers/slices/authSlice";
import { setCartItems, removeFromCart as removeCartItem } from "../../reducers/slices/cartSlice";
import { apiConnector } from "../apiConnector";
import { cartItemEndpoints } from "../apis";
import toast from 'react-hot-toast';

export const getCartItems = (token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('GET', cartItemEndpoints.GET_CART_ITEMS_API, null, {
                Authorization: `Bearer ${token}`,
            });
            dispatch(setCartItems(response.data.data));
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            toast.error("Error fetching cart items");
        }
    };
};

export const addToCart = (token, courseId) => {
    return async (dispatch) => {
        try {
            await apiConnector('POST', cartItemEndpoints.ADD_TO_CART_API, { courseId }, {
                Authorization: `Bearer ${token}`,
            });
            // Fetch updated cart items after adding
            dispatch(getCartItems(token));
            toast.success("Item added to cart successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding item to cart");
            console.log(error);
        }
    };
};

export const removeFromCart = (courseId, token) => {
    return async (dispatch) => {
        try {
            await apiConnector('POST', cartItemEndpoints.REMOVE_FROM_CART_API, { courseId }, {
                Authorization: `Bearer ${token}`,
            });
            dispatch(removeCartItem(courseId));
            toast.success("Item removed from cart successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error removing item from cart");
            console.log(error);
        }
    };
};