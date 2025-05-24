import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSection, createSubSection, deleteSection, deleteSubSection, getAllSections, getAllSubSections, getAllSubsections, updateSection, updateSubSection } from '../../../services/operations/coursesApi'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { setCourseData, setCurrentStage } from '../../../reducers/slices/courseSlice'
import { SiPushbullet } from "react-icons/si";
import AddLectureModal from './AddLectureModal'


const CourseBuilder = () => {
  const courseData = useSelector((state) => state.course.courseData)
  const sections = useSelector((state) => state.course.sections)
  const token = useSelector((state) => state.profile.token)

  const dispatch = useDispatch()

  const [sectionName, setSectionName] = useState('')
  const [isSectionBeingUpdated, setIsSectionBeingUpdated] = useState(false)
  const [updatedSectionId, setUpdatedSectionId] = useState('')
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState(null)
  const [isLectureBeingUpdated, setIsLectureBeingUpdated] = useState(false)
  const [currentLectureId, setCurrentLectureId] = useState(null)
  const [currentLecture, setCurrentLecture] = useState(null)

  useEffect(() => {
    dispatch(getAllSections(token, courseData._id))
  }, [])


  const changeHandler = (e) => {
    setSectionName(e.target.value)
  }

  const createSectionHandler = (e) => {
    dispatch(createSection(token, sectionName, courseData._id))
    setSectionName('')
  }

  const editSectionHandler = (currentName, id) => {
    setIsSectionBeingUpdated(true)
    setSectionName(currentName)
    setUpdatedSectionId(id)
  }

  const updateSectionName = (e) => {
    dispatch(updateSection(token, sectionName, updatedSectionId))
    setIsSectionBeingUpdated(false)
    setSectionName('')
  }

  const deleteSectionHandler = (id) => {
    dispatch(deleteSection(token, id))
  }

  const createLectureHandler = (id) => {
    setCurrentSectionId(id)
    setIsLectureModalOpen(true)
  }

  const onCreateLecture = (data) => {
    dispatch(createSubSection(token, currentSectionId, data))
    setIsLectureModalOpen(false)
  }

  const onCancelLecture = () => {
    setIsLectureModalOpen(false)
    setIsLectureBeingUpdated(false)
  }

  const editSubSectionHandler = (data, id) => {
    setIsLectureBeingUpdated(true)
    setCurrentLectureId(id)
    setCurrentLecture(data)
  }

  const onUpdateLecture = (data) => {
    data.append("subSectionId", currentLectureId)
    setIsLectureBeingUpdated(false)

    data.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    
    dispatch(updateSubSection(token, data, currentLectureId))
  }

  const deleteSubSectionHandler = (sectionId, subSectionId) => {
    dispatch(deleteSubSection(token, sectionId, subSectionId))
  }

  const goToFinalStage = () => {
    if(sections.length > 0){
      dispatch(setCurrentStage(2))
    }
  }

  return (
    <div className='bg-[#161D29] ml-4 p-4 rounded-lg'>
      <div className='font-semibold text-xl w-[40vw] text-left'>Course Builder</div>

      <p className='text-left font-semibold py-4'>Sections</p>
      <div className="text-left pb-2">Create Section</div>
                          <div className="relative flex items-center gap-4 mb-4">
                              <input
                              className="w-[100%] bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                              name="courseName"
                              type="text"
                              value={sectionName}
                              placeholder="Enter your section name"
                              onChange={changeHandler}
                              />
                          </div>
      <div className='flex flex-col gap-4'>
        {
          sections.map((item, index) => {

            return (
            <div className='bg-[#2B333F] rounded-lg p-4' item={index}>
              <div className='text-left flex justify-between items-center'>
              {item.sectionName}
              <div className="w-[15%] flex justify-start items-center gap-4">
                  <div><FaPencilAlt className="text-xl cursor-pointer opacity-90 hover:opacity-70" onClick={() => editSectionHandler(item.sectionName, item._id)}/></div>
                  <div><MdDelete className="text-xl cursor-pointer opacity-90 hover:opacity-70" onClick={() => deleteSectionHandler(item._id)}/></div>
              </div>
            </div>

            {
              item.subSection.map((subSectionItem, index) => {
                return (<div>
                  <div className='flex items-center gap-4 py-1 justify-between w-[80%]'>
              <div className='flex gap-4'>
                <SiPushbullet className='ml-2 mt-2 text-2xl'/>
                <p className='font-semibold pt-2'>{subSectionItem.title}</p>
              </div>

              <div className="w-[12]5%] flex justify-start items-center gap-4">
                  <div><FaPencilAlt className="text-xl cursor-pointer opacity-90 hover:opacity-70 text-white" onClick={() => editSubSectionHandler(subSectionItem, subSectionItem._id)}/></div>
                  <div><MdDelete className="text-xl cursor-pointer opacity-90 hover:opacity-70 text-white" onClick={() => deleteSubSectionHandler(item._id, subSectionItem._id)}/></div>

              </div>
            </div>
                </div>)
              })
            }

              {
                isLectureBeingUpdated &&
                (<AddLectureModal sectionId={currentSectionId} isModalOpen={isLectureBeingUpdated} onUpdate={onUpdateLecture} existingLecture={currentLecture} onClose={onCancelLecture} />)
              } 

            <button className="bg-[#e25a25] w-[100%] p-2 my-4 mb-2 rounded-md text-white hover:opacity-60"
        onClick={() => createLectureHandler(item._id)}>Add a Lecture</button>
            </div>
            )
          })
        }
      </div>

      {!isSectionBeingUpdated ? (
        <><button className="bg-[#CBAA0B] w-[100%] p-2 my-4 mb-2 rounded-md text-black hover:opacity-60"
        onClick={createSectionHandler}>Create a new Section</button></>
        ) : 
        (<>
        <button className="bg-[#CBAA0B] w-[100%] p-2 my-4 mb-2 rounded-md text-black hover:opacity-60"
        onClick={() => updateSectionName()}>Update Section Name</button>
        </>)}
      
      {
        isLectureModalOpen &&
        (<AddLectureModal sectionId={currentSectionId} isModalOpen={isLectureModalOpen} onSubmit={onCreateLecture} onClose={onCancelLecture}/>)
      }

      <button className="bg-[#CBAA0B] w-[100%] p-2 my-4 mb-2 mt-8 font-semibold rounded-md text-black hover:opacity-60"
        onClick={() => goToFinalStage()}>Complete</button>
    </div>
  )
}

export default CourseBuilder
