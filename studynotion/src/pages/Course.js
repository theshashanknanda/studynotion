import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addCartItem, addCourseToUser } from '../services/operations/coursesApi';

const Course = () => {
    const {id} = useParams()
    const { state } = useLocation();
    const { course } = state || {};

    const dispatch = useDispatch()
    const token = useSelector((state) => state.profile.token)

    const handleAddToCart = () => {
        dispatch(addCartItem(token, id))
    }

    const buyCourse = async () => {
        dispatch(addCourseToUser(token, id))
    };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen px-4 sm:px-6 py-6 sm:py-10 text-left">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {/* Breadcrumb */}
          <p className="text-xs sm:text-sm text-gray-400 mb-2">Home / Learning / Web Development</p>

          {/* Course Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{course.courseName}</h1>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 sm:mb-6">{course.courseDescription}</p>

          {/* What You'll Learn */}
          <div className="border border-gray-700 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">What you'll learn</h2>
            <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-xs sm:text-sm text-gray-300">
              {course.whatYouWillLearn}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-[#1e293b] rounded-lg overflow-hidden shadow-lg order-1 lg:order-2 sticky top-4">
          {/* Thumbnail */}
          <img 
            src={course.thumbnail} 
            alt={course.courseName} 
            className="w-full h-48 sm:h-52 object-cover" 
            loading="lazy"
          />

          <div className="p-4 sm:p-6 border-t border-gray-700">
            <p className="text-xl sm:text-2xl font-semibold mb-4">$ {course.price}</p>
            <button 
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium sm:font-semibold py-2.5 sm:py-3 px-4 rounded mb-3 text-sm sm:text-base transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 sm:py-3 px-4 rounded border border-gray-600 text-sm sm:text-base transition-colors font-medium"
              onClick={buyCourse}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>  )
}

export default Course
