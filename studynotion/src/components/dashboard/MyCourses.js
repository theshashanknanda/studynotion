import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getInstructorCourses } from "../../services/operations/coursesApi";
import Loader from "../Loader";
import { setCourseData, setIsEdit } from "../../reducers/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import DeleteCourseModal from "./DeleteCourseModal";

const MyCourses = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector((state) => state.profile.token);
  const loading = useSelector((state) => state.auth.loading);

  const [courses, setCourses] = useState([])
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [courseIdToBeDelete, setCourseIdToBeDeleted] = useState(null)

  useState(() => {
    dispatch(getInstructorCourses(token, setCourses))
  })

  const updateCourse = (data) => {
    dispatch(setCourseData(data))
    dispatch(setIsEdit(true))
    navigate('/dashboard/add-course')
  }

  const deleteHandler = (id) => {
    setIsDeleteModalVisible(true)
    setCourseIdToBeDeleted(id)
  }

  const deleteCourseHandler = () => {
    dispatch(deleteCourse(token, courseIdToBeDelete))
    dispatch(getInstructorCourses(token, setCourses))
    setIsDeleteModalVisible(false)
  }

  const onDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }
  return (
    <div className="text-white w-full max-w-[1200px] text-left mx-auto p-4 sm:p-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader/>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-2">
            <h1 className="text-xl sm:text-2xl font-semibold">My Courses</h1>
            <a href="/dashboard/add-course">
              <button className="flex items-center gap-2 rounded-full bg-[#FACC15] px-4 py-2 text-black font-medium hover:opacity-70 transition-opacity">
                <FaPlus className="text-base sm:text-lg" />
                <span>New</span>
              </button>
            </a>
          </div>

          <div className="border border-[#626262] rounded-lg p-3 sm:p-4 mt-6 sm:mt-8 overflow-x-auto">
            {/* Header - Hidden on mobile */}
            <div className="hidden sm:flex justify-between text-sm sm:text-base opacity-70 font-medium mb-4">
              <p className="w-[70%] text-left">COURSES</p>
              <p className="w-[15%] text-left">PRICE</p>
              <p className="w-[15%] text-left">ACTIONS</p>
            </div>

            <div className="space-y-6">
              {courses.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-0 border-b border-gray-700 last:border-b-0 pb-6 last:pb-0">
                  {/* Course Info */}
                  <div className="w-full sm:w-[70%]">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <img
                        src={item.thumbnail}
                        alt={item.courseName}
                        className="w-full sm:w-[180px] rounded-md object-cover"
                        loading="lazy"
                      />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{item?.courseName}</h3>
                        <p className="text-sm text-gray-300">
                          {item?.courseDescription}
                        </p>
                        <p className="text-xs text-gray-400">
                          Total {item?.ratingAndReviews?.length} reviews
                        </p>
                        <p className="font-medium text-[#FFD608] text-sm">
                          {item?.courseContent?.length} Sections
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price - Shown differently on mobile */}
                  <div className="flex sm:w-[15%] items-center">
                    <div className="text-base sm:text-sm text-gray-300 font-medium">
                      <span className="sm:hidden mr-2 text-gray-400">Price:</span>
                      ${item?.price}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:w-[15%] items-center gap-4 sm:justify-start">
                    <button 
                      onClick={() => updateCourse(item)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                      aria-label="Edit course"
                    >
                      <FaPencilAlt className="text-lg sm:text-xl" />
                    </button>
                    <button 
                      onClick={() => deleteHandler(item._id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                      aria-label="Delete course"
                    >
                      <MdDelete className="text-lg sm:text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {isDeleteModalVisible && (
        <DeleteCourseModal 
          isModalOpen={isDeleteModalVisible} 
          onYes={deleteCourseHandler} 
          onClose={onDeleteCancel}
        />
      )}
    </div>
  );
};

export default MyCourses;
