import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/resetPasswordApi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const token = window.location.pathname.split("/").pop();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsPasswordSame(password === confirmPassword);
  }, [password, confirmPassword]);

  const resetPasswordHandler = async (e) => {
    dispatch(resetPassword(token, password, setIsPasswordReset));
  };
  return (
    <div className="bg-richblack-900 text-white min-h-[100vh]">
          {
            loading ? (<Loader/>) : 
            (
              <div>
                {
        isPasswordReset ? (
            <div>
                <div className="w-[30vw] mx-auto flex flex-col gap-4 pt-[5%]">
                    <h1 className="text-left text-2xl font-semibold opacity-90">Reset complete!</h1>
                    <p className="text-left opacity-70">All done! Go back to login page and try loggin in with your new account</p>
                    
                    <div className="flex flex-col gap-2">
                        <button className="bg-[#CBAA0B] w-[100%] p-2 mb-2 rounded-md text-black hover:opacity-60"
                        onClick={() => navigate('/login')}>
                            Return to login
                        </button>

                        <a href="/login">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <IoIosArrowRoundBack className="w-[20px] h-[20px] text-white "/>
                                <p className="text-white">Back to login</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-[30vw] mx-auto flex flex-col gap-4 pt-[5%]">
        <h1 className="text-3xl opacity-90 text-left font-semibold">
          Choose new password
        </h1>
        <p className="text-left opacity-70">
          Almost done. Enter your new password and you're all set.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-left">New password</p>
            <input
              className="w-[100%] bg-[#111621] text-white rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
              name="email"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-left">Confirm password</p>
            <input
              className="w-[100%] bg-[#111621] text-white rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
              name="email"
              type="password"
              placeholder="******"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          {
            !isPasswordSame ? (<div>
                <p className="text-left text-red-600">Passwords are not same</p>
            </div>) : (<div></div>)
          }
        </div>

        <button
          className="bg-[#CBAA0B] w-[100%] p-2 mb-2 rounded-md text-black hover:opacity-60"
          onClick={resetPasswordHandler}
          disabled={!isPasswordSame}
        >
          Reset password
        </button>
      </div>
        )
      }

              </div>
            )
          }
    </div>
  );
};

export default ResetPassword;
