import { FaEye, FaEyeSlash } from "react-icons/fa";
import frame from "../assets/frame.png";
import signupbg from "../assets/signup.png";
import '../App.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../reducers/slices/authSlice";
import Loader from "./Loader";

const Signup = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading);

    let [signupData, setSignupData] = useState({accountType: 'Student', firstName: '', lastName: '', email: '', password: '', confirmPassword: ''})
    let [isPassVisible, setIsPassVisible] = useState(false)
    let [isConfirmVisible, setIsConfirmVisible] = useState(false)
    let [userType, setUserType] = useState('Student')
    let [isPasswordSame, setIsPasswordSame] = useState(false)

    let changeHandler = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setIsPasswordSame(signupData.password === signupData.confirmPassword)
    }, [signupData])

    let submitHandler = async (e) => {
      if(
        !signupData.firstName || 
        !signupData.lastName || 
        !signupData.email || 
        !signupData.password || 
        !signupData.confirmPassword
      ){
        alert("Please fill all the fields")
        return;
      }
      
        e.preventDefault()
        if(isPasswordSame){
            dispatch(setSignUpData(signupData))
            dispatch(sendOtp(signupData.email, navigate))
        }
    }

    return (
        <div className="bg-richblack-900 text-white min-h-[100vh] pt-8">
          {loading ? (
            <Loader />
          ) : (
            <div className="w-[90%] md:w-[80vw] mx-auto">
              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
                <div className="w-full lg:w-[45%]">
                  <div className="text-2xl md:text-4xl font-semibold text-left my-4 md:my-6">
                    Join the millions learning to code with StudyNotion for free
                  </div>
                  <p className="opacity-80 mb-1 text-left text-sm md:text-base">
                    Build skills for today, tomorrow, and beyond.
                  </p>
                  <div className="text-blue-500 text-left mb-4 md:mb-6 text-sm md:text-base">
                    <button className="hover:text-blue-400 transition-colors">
                      <i>Education to future proof your career.</i>
                    </button>
                  </div>

                  <form onSubmit={submitHandler} className="w-full">
                    <div className="bg-[#111722] w-full sm:w-fit px-2 p-1 my-4 md:my-6 rounded-full flex flex-col sm:flex-row gap-2 sm:gap-6">
                      <button 
                        className={`${userType === 'Student' ? 'active' : ''} w-full sm:w-auto px-4 py-3 rounded-full transition-all duration-500 text-sm md:text-base`}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setUserType('Student'); 
                          setSignupData({...signupData, 'accountType': 'Student'})
                        }}
                      >
                        Student
                      </button>
                      <button 
                        className={`${userType === 'Instructor' ? 'active' : ''} w-full sm:w-auto px-4 py-3 rounded-full transition-all duration-500 text-sm md:text-base`}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setUserType('Instructor'); 
                          setSignupData({...signupData, 'accountType': 'Instructor'})
                        }}
                      >
                        Instructor
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between my-4">
                      <div className="w-full sm:w-[48%]">
                        <div className="text-left pb-2 text-sm md:text-base">First Name</div>
                        <div className="relative flex items-center">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            onChange={changeHandler}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-[48%]">
                        <div className="text-left pb-2 text-sm md:text-base">Last Name</div>
                        <div className="relative flex items-center">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            onChange={changeHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-left pb-2 text-sm md:text-base">Email</div>
                      <input
                        className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                        name="email"
                        type="email"
                        placeholder="abc@gmail.com"
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
                      <div className="w-full sm:w-[48%]">
                        <div className="text-left pb-2 text-sm md:text-base">Create Password</div>
                        <div className="relative flex items-center">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                            name="password"
                            type={isPassVisible ? "text" : "password"}
                            placeholder="*****"
                            onChange={changeHandler}
                          />
                          <div 
                            className="absolute right-3 cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsPassVisible(prev => !prev)}
                          >
                            {isPassVisible ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-[48%]">
                        <div className="text-left pb-2 text-sm md:text-base">Confirm Password</div>
                        <div className="relative flex items-center">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                            name="confirmPassword"
                            type={isConfirmVisible ? "text" : "password"}
                            placeholder="*****"
                            onChange={changeHandler}
                          />
                          <div 
                            className="absolute right-3 cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsConfirmVisible(prev => !prev)}
                          >
                            {isConfirmVisible ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isPasswordSame && (
                      <p className="text-left mt-2 text-red-600 text-sm md:text-base">Passwords don't match</p>
                    )}

                    <button 
                      className="bg-[#CBAA0B] w-full p-2.5 md:p-3 mt-6 rounded-md text-black text-sm md:text-base font-medium hover:bg-[#b69909] transition-colors"
                    >
                      Create Account
                    </button>
                  </form>
                </div>

                <div className="relative hidden lg:block w-[45%]">
                  <img 
                    className="w-full" 
                    src={frame} 
                    alt="frame"
                    loading="lazy" 
                  />
                  <img
                    className="absolute top-[6%] left-[6%] w-[88%] h-[88%] object-cover"
                    src={signupbg}
                    alt="background"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Signup
