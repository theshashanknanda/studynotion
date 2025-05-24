import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000814',
    color: '#F4B71D',
    borderRadius: '20px',
    padding: '30px',
    width: '500px',
    textAlign: 'left',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
}

const AddLectureModal = ({ isModalOpen, onClose, onSubmit, sectionId, existingLecture = null, onUpdate}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [videoUrl, setVideoUrl] = useState(null)
  const [newFile, setNewFile] = useState(null)

  useEffect(() => {
    if (existingLecture) {
      setValue("title", existingLecture.title || "")
      setValue("description", existingLecture.description || "")
      setVideoUrl(existingLecture.videoUrl || null)
    }
  }, [existingLecture, setValue])

  const handleSubmitForm = (data) => {
    if (!data.title || !data.description || (!videoUrl && !newFile)) {
      toast.error("Please fill out all fields")
      return
    }

    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("sectionId", sectionId)

    if (newFile) {
      formData.append("video", newFile)
    } else if (videoUrl) {
      // formData.append("videoUrl", videoUrl)
    }

    if(!existingLecture){
      onSubmit(formData)
    }else{
      onUpdate(formData)
    }
    toast.success(existingLecture ? "Lecture updated" : "Lecture added")

    // Reset local state
    setVideoUrl(null)
    setNewFile(null)
    onClose()
  }

  return (
    <Modal isOpen={isModalOpen} style={customStyles} contentLabel="Add Lecture">
      <h2 className="text-xl font-semibold mb-6 text-white">
        {existingLecture ? "Edit Lecture" : "Add New Lecture"}
      </h2>

      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-2 rounded bg-[#111621] text-white focus:outline-[#F4B71D]"
            placeholder="Enter lecture title"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 rounded bg-[#111621] text-white focus:outline-[#F4B71D]"
            placeholder="Enter lecture description"
          />
          {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
        </div>

        {/* Current Video (Preview) */}
        {videoUrl && !newFile && (
          <div>
            <label className="block mb-1 text-sm">Current Video</label>
            <video src={videoUrl} controls className="w-full rounded" />
            <p className="text-sm mt-1 text-gray-400">Uploading a new file will replace this video.</p>
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-sm">Upload New Video</label>
          <input
            type="file"
            accept="video/*"
            {...register("lectureVideo")}
            onChange={(e) => setNewFile(e.target.files[0])}
            className="text-white"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#F4B71D] text-[#F4B71D] px-4 py-2 rounded hover:bg-[#F4B71D] hover:text-black transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#F4B71D] text-black px-4 py-2 rounded hover:opacity-90 transition"
          >
            {existingLecture ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddLectureModal
