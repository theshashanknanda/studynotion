import { FaEye, FaEyeSlash } from "react-icons/fa";
import frame from "../assets/frame.png";
import loginbg from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

let Signin = () => {
    let [loginData, setLoginData] = useState({email: '', password: ''})
    let [isLoginPassVisible, setIsLoginPassVisible] = useState(false)
    
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading);

    let changeHandler = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    let submitHandler = (e) => {
      if(!loginData.email || !loginData.password){
        alert("Please fill all the fields")
        return;
      }

        e.preventDefault();
        dispatch(loginUser(loginData, navigate))
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
                Welcome Back
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
                <div className="mb-4">
                  <div className="text-left pb-2 text-sm md:text-base">Email Address</div>
                  <input
                    className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                    name="email"
                    type="email"
                    placeholder="abc@mail.com"
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <div className="text-left pb-2 text-sm md:text-base">Password</div>
                  <div className="relative flex items-center">
                    <input
                      className="w-full bg-[#111621] rounded-md p-3 text-sm md:text-base outline-none focus:outline-[#CBAA0B] transition-all"
                      name="password"
                      type={isLoginPassVisible ? "text" : "password"}
                      placeholder="*****"
                      onChange={changeHandler}
                    />
                    <div 
                      className="absolute right-3 cursor-pointer text-gray-400 hover:text-white transition-colors"
                      onClick={() => setIsLoginPassVisible(prev => !prev)}
                    >
                      {isLoginPassVisible ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs md:text-sm text-blue-500 p-2 mb-2">
                  <a 
                    href="/forgotPassword"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button 
                  className="bg-[#CBAA0B] w-full p-2.5 md:p-3 mb-2 rounded-md text-black text-sm md:text-base font-medium hover:bg-[#b69909] transition-colors"
                >
                  Sign In
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
                src={loginbg}
                alt="background"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
