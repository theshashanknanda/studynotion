import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../services/operations/authApi'
import Loader from '../Loader'

const MyProfile = () => {
    const user = useSelector((state) => state.profile.user)
    const token = useSelector((state) => state.profile.token)
    const dispatch = useDispatch()

    let [signupData, setSignupData] = useState({firstName: user.firstName, lastName: user.lastName, password: '', newPassword: ''})
        let [isPassVisible, setIsPassVisible] = useState(false)
        let [isConfirmVisible, setIsConfirmVisible] = useState(false)
        let [userType, setUserType] = useState('Student')
        let [isPasswordSame, setIsPasswordSame] = useState(false)
        let [areChangesSaved, setAreChangesSaved] = useState(true)

        const loading = useSelector((state) => state.auth.loading);

        let changeHandler = (e) => {
            setSignupData({
                ...signupData,
                [e.target.name]: e.target.value
            })
            setAreChangesSaved(false)
        }

        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(updateUser(signupData, token, setAreChangesSaved, setSignupData))
        }

        const cancelHandler = (e) => {
            e.preventDefault()
            setSignupData({firstName: user.firstName, lastName: user.lastName, password: '', newPassword: ''})
            setAreChangesSaved(true)
        }

        useEffect(() => {
                setIsPasswordSame(signupData.password === signupData.newPassword)
        }, [signupData])

  return (
    <div className='text-white w-[90%] mx-auto p-4'>
      
      {
      loading ? (<Loader/>) :
      (<div>
        <div className='text-2xl text-left font-semibold'>My Profile</div>

<div className='bg-[#161D29] w-[90%] flex items-start justify-start p-4 rounded-lg mt-4 gap-2'>
  <img src={user.image} alt='Profile' className='h-[140px] rounded-md'/>
  <div className='flex flex-col gap-4 ml-4'>
      <div>
          <div className='text-lg font-semibold text-left'>Name</div>
          <div className='text-left'>{user.firstName} {user.lastName}</div>
      </div>
      <div>
          <div className='text-lg font-semibold text-left'>Email</div>
          <div className='text-left'>{user.email}</div>
      </div>
  </div>
</div>

<div className='bg-[#161D29] w-[90%] flex items-start justify-start flex-col p-4 rounded-lg mt-4'>
  <div className='font-semibold'>Update Profile Information</div>
  {!areChangesSaved &&
              <p className="text-left mt-2 text-red-600">Unsaved changes</p>}
  <form className='w-[80%]' onSubmit={submitHandler}>


              <div className="flex gap-6 justify-between my-4">
                <div className="w-[48%]">
                    <div className="text-left pb-2">First Name</div>
                    <div className="relative flex items-center gap-4">
                        <input
                        className="w-[100%] bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={changeHandler}
                        />
                    </div>
                </div>

                <div className="w-[48%]">
                    <div className="text-left pb-2">Last</div>
                    <div className="relative flex items-center gap-4">
                        <input
                        className="w-[100%] bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signupData.lastName}
                        onChange={changeHandler}
                        />
                    </div>
                </div>
              </div>
    
              <div className="flex gap-6 justify-between">
                <div className="w-[48%]">
                    <div className="text-left pb-2">Current Password</div>
                    <div className="relative flex items-center gap-4">
                        <input
                        className="w-[100%] bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                        name="password"
                        type={isPassVisible ? "text" : "password"}
                        placeholder="*****"
                        onChange={changeHandler}
                        value={signupData.password}
                        />
                        <div className="absolute right-0 p-4" onClick={() => {setIsPassVisible((prev) => {return !prev})}}>
                            {isPassVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                </div>

                <div className="w-[48%]">
                    <div className="text-left pb-2">New Password</div>
                    <div className="relative flex items-center gap-4">
                        <input
                        className="w-[100%] bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                        name="newPassword"
                        type={isConfirmVisible ? "text" : "password"}
                        placeholder="*****"
                        onChange={changeHandler}
                        value={signupData.newPassword}
                        />
                        <div className="absolute right-0 p-4" onClick={() => {setIsConfirmVisible((prev) => {return !prev})}}>
                            {isConfirmVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                </div>
              </div>
              {!isPasswordSame &&
              <p className="text-left mt-2 text-red-600">Passwords don't match</p>}

              <div className="text-right text-sm text-blue-500 p-2 mb-2"><a href="#">forgot password</a></div>
    
              <button className="bg-[#2a2d31] w-[20%] p-2 mb-2 rounded-md text-white hover:opacity-60 mx-4" type='button' onClick={cancelHandler}>Cancel</button>
              <button className="bg-[#CBAA0B] w-[20%] p-2 mb-2 rounded-md text-black hover:opacity-60 mx-4">Save</button>
            </form>
</div>
      </div>)
        }
      
    </div>
  )
}

export default MyProfile
