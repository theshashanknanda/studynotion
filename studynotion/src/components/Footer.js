import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#161D29]'>
      <div className='w-[80%] mx-auto flex gap-28 justify-center p-16'>
        <div className='text-left'>
            <p className='font-semibold text-md'>Navigate</p>
            <ul className='opacity-80 py-4 flex flex-col gap-2'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='text-left'>
            <p className='font-semibold text-md'>Join us</p>
            <ul className='opacity-80 py-4 flex flex-col gap-2'>
                <li>Login</li>
                <li>Sign Up</li>
            </ul>
        </div>
        <div className='text-left'>
            <p className='font-semibold text-md'>Become an instructor</p>
            <ul className='opacity-80 py-4 flex flex-col gap-2'>
                <li>Create Course</li>
                <li>Look-Up courses</li>
                <li>Sign Up as a Instructor</li>
            </ul>
        </div>
        <div className='text-left'>
            <p className='font-semibold text-md'>Support</p>
            <ul className='opacity-80 py-4 flex flex-col gap-2'>
                <li>Contact Us</li>
                <li>Email Us</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
