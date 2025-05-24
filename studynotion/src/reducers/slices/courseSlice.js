import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const currentStage = localStorage.getItem('currentStage')
const courseData = localStorage.getItem('courseData')

const initialState = {
    isEdit: false,
    currentStage: currentStage !== null ? parseInt(currentStage) : 0,
    courseData: courseData && (courseData != undefined) ? JSON.parse(courseData) : null,
    sections: [],
    loading: false,
}

export const courseSlice = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {
    setCourseData: (state, action) => {
        localStorage.setItem('courseData', JSON.stringify(action.payload))
        state.courseData = action.payload
    },
    setSections: (state, action) => {
        state.sections = action.payload;
    },
    // addSection: (state, action) => {
    //     state.sections.push(action.payload)
    // },
    // updateSection: (state, action) => {
    //     const { id, data } = action.payload
    //     state.sections = state.sections.map(item => {
    //         if(item._id === id){
    //             return {
    //                 ...data,
    //                 _id: id,
    //             }
    //         }
    //     })
    // },
    // removeSection: (state, action) => {
    //     const { id } = action.payload
    //     state.sections = state.sections.filter((item, i) => i !== id)
    // },
    // addSubSection: (state, action) => {
    //     state.sections.push(action.payload)
    // },
    // updateSubSection: (state, action) => {
    //     const { sectionId, subsectionId, data } = action.payload
    //     state.sections = state.sections.map(item => {
    //         if(item._id === sectionId){
    //             return {
    //                 ...item,
    //                 subSections: item.subSections.map(subItem => {
    //                     if(subItem._id === subsectionId){
    //                         return {
    //                             ...data,
    //                             _id: subsectionId,
    //                         }
    //                     }
    //                     return subItem
    //                 })
    //             }
    //         }
    //         return item
    //     })
    // },
    // removeSubSection: (state, action) => {
    //     const { sectionId, subSectionId } = action.payload
    //     state.sections = state.sections.map(item => {
    //         if(item._id === sectionId){
    //             return {
    //                 ...item,
    //                 subSections: item.subSections.filter(subItem => subItem._id !== subSectionId)
    //             }
    //         }
    //         return item
    //     })
    // },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCurrentStage: (state, action) => {
        localStorage.setItem('currentStage', action.payload)
        state.currentStage = action.payload
    },
    setIsPublished: (state, action) => {
        state.isPublished = action.payload
    },

    setIsEdit: (state, action) => {
        state.isEdit = action.payload
    }
    // setSubSections: (state, action) => {
    //     const { sectionId, subSections } = action.payload;
      
    //     state.sections = state.sections.map(section => {
    //       if (section._id === sectionId) {
    //         return {
    //           ...section,
    //           subSections: subSections
    //         };
    //       }
    //       return section;
    //     });
    //   }
  }
})

export const { 
  setCourseData, 
  setSections, 
  addSection, 
  updateSection, 
  removeSection, 
  addSubSection, 
  updateSubSection, 
  removeSubSection, 
  setLoading, 
  setCurrentStage, 
  setIsPublished,
  setSubSections,
  setIsEdit,
} = courseSlice.actions

export default courseSlice.reducer
