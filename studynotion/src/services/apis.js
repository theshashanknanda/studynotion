const BASE_URL = process.env.REACT_APP_API_URL

// AUTH ENDPOINTS
export const authEndPoints = {
  SENDOTP_API: BASE_URL + "/api/v1/sendOTP",
  SIGNUP_API: BASE_URL + "/api/v1/signup",
  LOGIN_API: BASE_URL + "/api/v1/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/sendPasswordResetToken",
  RESETPASSWORD_API: BASE_URL + "/api/v1/resetPassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_USER_PROFILE_API: BASE_URL + "/api/v1/updateProfile",
  GET_USER_DETAILS_API: BASE_URL + "/getUserDetails",
  DELETE_USER_PROFILE_API: BASE_URL + "/deleteProfile",
}

// STUDENTS ENDPOINTS
// export const studentEndpoints = {
//   COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
//   COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
//   SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
// }

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ENROLLED_COURSES_API: BASE_URL + "/api/v1/getStudentCourses",
  GET_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/getInstructorCourses",
  CREATE_COURSE_API: BASE_URL + "/api/v1/createCourse",
  
  GET_ALL_CATEGORIES_API: BASE_URL + "/api/v1/getAllCategories",
  GET_ALL_SECTIONS: BASE_URL + "/api/v1/getAllSections",
  CREATE_SECTION_API: BASE_URL + "/api/v1/createSection",
  GET_ALL_SUB_SECTIONS: BASE_URL + "/api/v1/getAllSubSections",
  
  UPDATE_SECTION_API: BASE_URL + "/api/v1/updateSection",
  DELETE_SECTION_API: BASE_URL + "/api/v1/deleteSection",
  
  CREATE_SUBSECTION_API: BASE_URL + "/api/v1/createSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/api/v1/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/api/v1/deleteSubSection",
  UPDATE_COURSE_STATUS_API: BASE_URL + "/api/v1/updateCourseStatus",
  UPDATE_COURSE_API: BASE_URL + "/api/v1/updateCourse",
  DELETE_COURSE_API: BASE_URL + "/api/v1/deleteCourse",
  
  GET_ALL_CATEGORY_COURSES_API: BASE_URL + "/api/v1/showAllCategoryCourses",
  ADD_CART_ITEM_API: BASE_URL + "/api/v1/addCartItem",
  ADD_COURSE_TO_USER: BASE_URL + "/api/v1/addCourseToStudent",
  ADD_COMPLETED_LECTURE: BASE_URL + "/api/v1/addCompletedLecture"
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/api/v1/contactUs",
}

export const cartItemEndpoints = {
  ADD_TO_CART_API: BASE_URL + "/api/v1/addToCart",
  GET_CART_ITEMS_API: BASE_URL + "/api/v1/getCartItems",
  REMOVE_FROM_CART_API: BASE_URL + "/api/v1/removeCartItem",
}


// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  CREATE_RATING_AND_REVIEW_API: BASE_URL + "/createRatingAndReview",
  GET_AVERAGE_RATING_API: BASE_URL + "/getAverageRating",
  GET_COURSE_RATING_AND_REVIEW: BASE_URL + "/getCourseRatingAndReview",
}
