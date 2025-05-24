import toast from "react-hot-toast"
import { setLoading } from "../../reducers/slices/authSlice"
import { addSection, addSubSection, setCourseData, setSections, setSubSections } from "../../reducers/slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

export const getEnrolledCourses = (token, setCourses) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('GET', courseEndpoints.GET_ENROLLED_COURSES_API, null, {
                Authorization: `Bearer ${token}`,
            })
    
            setCourses(response.data.data)
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const getInstructorCourses = (token, setCourses) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('GET', courseEndpoints.GET_INSTRUCTOR_COURSES_API, null, {
                Authorization: `Bearer ${token}`,
            })
            setCourses(response.data.data)
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const getAllCategories = (token, setCategories) => {
    return async (dispatch) =>{
        try{
            const response = await apiConnector('GET', courseEndpoints.GET_ALL_CATEGORIES_API, null, {
                Authorization: `Bearer ${token}`,
            })
            setCategories(response.data.data)
        }catch(error){
            console.log(error)
        }
    }
}

export const createCourse = (token, courseData) => {
    
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.CREATE_COURSE_API, courseData, {
                Authorization: `Bearer ${token}`,
            })

            dispatch(setLoading(false))
            dispatch(setCourseData(response.data.data.course))
            return response.data
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const getAllSections = (token, courseId) => {
    return async(dispatch) => {
        try{
            const response = await apiConnector('POST', courseEndpoints.GET_ALL_SECTIONS, {
                courseId: courseId,
            }, {
                Authorization: `Bearer ${token}`
            })

            const sections = response.data.data;
            dispatch(setSections(sections))
        }catch(error){
            console.log(error)
        }
    }
}

export const createSection = (token, sectionName, courseId) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        const response = await apiConnector('POST', courseEndpoints.CREATE_SECTION_API, {
            courseId: courseId,
            sectionName: sectionName,
        }, {
            Authorization: `Bearer ${token}`
        })

        dispatch(getAllSections(token, courseId))
        dispatch(setLoading(false))
    }
}

export const updateSection = (token, newName, sectionId) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('PUT', courseEndpoints.UPDATE_SECTION_API, {
                sectionId: sectionId,
                sectionName: newName,
            }, {
                Authorization: `Bearer ${token}`
            })
    
        }catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const deleteSection = (token, sectionId) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('DELETE', courseEndpoints.DELETE_SECTION_API, {
                sectionId: sectionId,
            }, {
                Authorization: `Bearer ${token}`
            })
    
        }catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const createSubSection = (token, sectionId, data) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.CREATE_SUBSECTION_API, data, {
                Authorization: `Bearer ${token}`,
            })

            dispatch(setLoading(false))

            dispatch(getAllSections(token, sectionId))
            return response.data
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const updateSubSection = (token, data, subsectionId) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('PUT', courseEndpoints.UPDATE_SUBSECTION_API, data, {
                Authorization: `Bearer ${token}`
            })
    
        }catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const deleteSubSection = (token, sectionId, subSectionId) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('DELETE', courseEndpoints.DELETE_SUBSECTION_API, {
                sectionId: sectionId,
                subSectionId: subSectionId,
            }, {
                Authorization: `Bearer ${token}`
            })
    
        }catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const updateCourseStatus = (token, courseId, status) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.UPDATE_COURSE_STATUS_API, {
                courseId: courseId,
                isPublished: status,
            }, {
                Authorization: `Bearer ${token}`
            })
        }catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const updateCourse = (token, courseData, courseId) => {
    
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('PUT', courseEndpoints.UPDATE_COURSE_API, courseData, {
                Authorization: `Bearer ${token}`,
            })

            dispatch(setLoading(false))
            return response.data
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const deleteCourse = (token, courseId) => {
    
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.DELETE_COURSE_API, {
                courseId: courseId,
            }, {
                Authorization: `Bearer ${token}`,
            })
            console.log(response)

            dispatch(setLoading(false))
            console.log(response.data)
            return response.data
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const showAllCategoryCourses = (token, categoryId, setCourses) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.GET_ALL_CATEGORY_COURSES_API, {
                categoryId: categoryId,
            }, {
                Authorization: `Bearer ${token}`,
            })
    
            setCourses(response.data.data.inCategory)
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const addCartItem = (token, courseId) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.ADD_CART_ITEM_API, {
                courseId: courseId,
            }, {
                Authorization: `Bearer ${token}`,
            })

            toast.success("Added in Cart")
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }
}

export const addCourseToUser = (token, courseId) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.ADD_COURSE_TO_USER, {
                courseId: courseId,
            }, {
                Authorization: `Bearer ${token}`,
            })

            toast.success("Course bought")
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }
}

export const addCompletedLecture = (token, subSectionId, courseId) => {
    return async (dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', courseEndpoints.ADD_COMPLETED_LECTURE, {
                subsectionId: subSectionId,
                courseId, courseId
            }, {
                Authorization: `Bearer ${token}`,
            })

            toast.success("Lecture Completed")
            dispatch(setLoading(false))
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }
}
