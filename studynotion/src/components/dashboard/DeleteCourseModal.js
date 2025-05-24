import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {toast } from 'react-hot-toast';

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
      width: '350px',
      textAlign: 'center',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
  }

  
  const DeleteCourseModal = ({isModalOpen, onClose, onYes}) => {
    
    return (
      <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Are you sure you want to delete the course?</h2>
      <div className="flex justify-center gap-4">
        <button
            onClick={onClose}
            className="border border-[#F4B71D] text-[#F4B71D] px-4 py-2 rounded hover:bg-[#F4B71D] hover:text-black transition"
        >
          No
        </button>
        <button
          onClick={() => {
            toast.success("Course deleted")
            onYes()
          }}
          className="bg-[#F4B71D] text-black px-4 py-2 rounded hover:opacity-90 transition"
        >
          Yes
        </button>
      </div>
      </Modal>
      </div>
    )
  }
  
  export default DeleteCourseModal
  