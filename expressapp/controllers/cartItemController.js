const CartItem = require('../models/Cart');
const Course = require('../models/Course');

// Add an item to the cart
exports.addCartItem = async (req, res, next) => {
    try {
        const { courseId } = req.body; // Get courseId from the request body
        const userId = req.user._id; // Get userId from the authenticated user

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if the item is already in the cart
        const existingCartItem = await CartItem.findOne({ courseId, userId });
        if (existingCartItem) {
            return res.status(400).json({
                success: false,
                message: "Item is already in the cart",
            });
        }

        // Add the item to the cart
        const cartItem = await CartItem.create({
            courseId,
            userId,
        });

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            data: cartItem,
        });
    } catch (error) {
        next(error);
    }
};

// Get all cart items for a user
exports.getCartItems = async (req, res, next) => {
    try {
        const userId = req.user._id; // Get userId from the authenticated user

        // Fetch all cart items for the user and populate course details
        const cartItems = await CartItem.find({ userId }).populate([{
            path: 'courseId',
            select: 'courseName courseDescription whatYouWillLearn price thumbnail instructor ratingAndReviews courseContent', // Select specific fields from the course
            populate: [{
                path: 'instructor',
                select: 'firstName lastName', // Populate instructor details
            }, {
                path: 'ratingAndReviews',
            }],
        }]);

        return res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cartItems,
        });
    } catch (error) {
        next(error);
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res, next) => {
    try {

        const userId = req.user._id; // Get userId from the authenticated user
        const { courseId } = req.body; // Get courseId from the request body

        // Find and delete the cart item
        const deletedCartItem = await CartItem.findOneAndDelete({ userId: userId, courseId: courseId });
   
        if (!deletedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            data: deletedCartItem,
        });
    } catch (error) {
        next(error);
    }
};