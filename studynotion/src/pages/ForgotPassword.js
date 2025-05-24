import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { sendResetPasswordLink } from '../services/operations/resetPasswordApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading);
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const sendEmailHandler = () => {
      dispatch(sendResetPasswordLink(email, setIsEmailSent))
    }
  return (
    <div>
      {
        loading ? (<Loader/>) : 
        (
         <div>
          {isEmailSent ? (
        <div className='bg-[#000814] min-h-[100vh]'>
          <div className='flex flex-col gap-4 pt-[10%] w-[30vw] mx-auto'>
            <h1 className='text-white text-2xl opacity-90 text-left font-medium'>Check email</h1>
            <p className='text-white opacity-70 text-left'>We have sent the reset email to {email} </p>

            <button className="bg-[#CBAA0B] w-[100%] p-2 mb-2 rounded-md text-black hover:opacity-60"
                    onClick={sendEmailHandler}>
              Resend Email
            </button>

            <a href="/login">
              <div className="flex items-center gap-2 cursor-pointer">
                <IoIosArrowRoundBack className="w-[20px] h-[20px] text-white "/>
                <p className="text-white">Back to login</p>
              </div>
            </a>
          </div>
        </div>) : (
        <div className='bg-[#000814] min-h-[100vh]'>
            <div className='w-[30vw] mx-auto flex flex-col gap-4 pt-[10%]'>
              <h1 className='text-white text-3xl text-left font-semibold'>Reset your password</h1>
              <p className='text-white opacity-70 text-left text-sm'>Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery</p>
              
              <div className="mb-4 flex flex-col">
                <div className="text-white text-left pb-2 opacity-90 text-sm">Email Address</div>
                
                <div className='flex flex-col gap-6'>
                  <input
                    className="w-[100%] bg-[#111621] text-white rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                    name="email"
                    type="email"
                    placeholder="abc@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button className="bg-[#CBAA0B] w-[100%] p-2 mb-2 rounded-md text-black hover:opacity-60"
                  onClick={sendEmailHandler}>
                    Send an email
                  </button>
                </div>

                <a href="/login">
                  <div className="flex items-center gap-2 cursor-pointer">
                      <IoIosArrowRoundBack className="w-[20px] h-[20px] text-white "/>
                      <p className="text-white">Back to login</p>
                  </div>
                </a>
              </div>

  
            </div>
        </div>
      )}
         </div> 
        )
      }
    </div>
  )
}

export default ForgotPassword
