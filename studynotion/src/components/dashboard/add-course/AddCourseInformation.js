import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loader from '../../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStage } from '../../../reducers/slices/courseSlice'
import { createCourse, getAllCategories, updateCourse } from '../../../services/operations/coursesApi'

const AddCourseInformation = () => {
  const dispatch = useDispatch()

  const token = useSelector((state) => state.profile.token)
  const user = useSelector((state) => state.profile.user)
  const loading = useSelector((state) => state.auth.loading)

  const { isEdit, courseData } = useSelector((state) => state.course)
  const userId = user._id

  const [category, setCategory] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // Load existing data in edit mode
  useEffect(() => {
    if (isEdit && courseData) {
      setValue("courseName", courseData.courseName)
      setValue("courseDescription", courseData.courseDescription)
      setValue("price", courseData.price)
      setValue("courseCategory", courseData.category)
      setValue("whatYouWillLearn", courseData.whatYouWillLearn)
    }
  }, [isEdit, courseData, setValue])

  useEffect(() => {
    dispatch(getAllCategories(token, setCategory))
  }, [dispatch, token])

  const onSubmit = (data) => {
    if (!data.thumbnail[0] && !isEdit) {
      console.log("Thumbnail is not selected")
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseName)
    formData.append("courseDescription", data.courseDescription)
    formData.append("price", data.price)
    formData.append("category", data.courseCategory)
    formData.append("whatYouWillLearn", data.whatYouWillLearn)
    formData.append("instructor", userId)

    if (data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0])
    }

    if (isEdit) {
      formData.append("courseId", courseData._id)
      dispatch(updateCourse(token, formData, courseData._id))
      dispatch(setCurrentStage(1))
    } else {
      dispatch(createCourse(token, formData))
      dispatch(setCurrentStage(1))
    }
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[600px]">
          <div className="bg-[#161D29] rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Course Name */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Course Title</div>
                <input
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all"
                  placeholder="Programming Tutorial"
                  {...register("courseName", { required: true })}
                />
                {errors.courseName && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Course Description */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Course Description</div>
                <textarea
                  rows={4}
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all resize-none"
                  placeholder="Describe your course"
                  {...register("courseDescription", { required: true })}
                />
                {errors.courseDescription && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Course Price</div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all"
                  placeholder="0.00"
                  {...register("price", { required: true })}
                />
                {errors.price && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Category */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Course Category</div>
                <select
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all"
                  {...register("courseCategory", { required: true })}
                >
                  <option value="">Select a category</option>
                  {category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.courseCategory && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Thumbnail */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Course Thumbnail</div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#CBAA0B] file:text-black hover:file:bg-[#b39609] cursor-pointer"
                  {...register("thumbnail", { required: !isEdit })}
                />
                {errors.thumbnail && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">What students will learn</div>
                <textarea
                  rows={4}
                  className="w-full bg-[#2C333F] rounded-lg p-3 text-white outline-none focus:outline-[#CBAA0B] transition-all resize-none"
                  placeholder="List the key learnings from this course"
                  {...register("whatYouWillLearn", { required: true })}
                />
                {errors.whatYouWillLearn && <div className="text-red-500 text-sm mt-1">This field is required</div>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${isEdit
                  ? 'bg-[#0BCB4A] hover:opacity-90'
                  : 'bg-[#CBAA0B] hover:opacity-90'} text-black`}
              >
                {isEdit ? "Update Course" : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCourseInformation
