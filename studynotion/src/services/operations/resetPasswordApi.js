import { setLoading } from "../../reducers/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../apis";
import toast, { Toaster } from 'react-hot-toast';

export const sendResetPasswordLink = (email, setIsEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', authEndPoints.RESETPASSTOKEN_API, {
                email: email,
            })
            dispatch(setLoading(false))
            setIsEmailSent(true)
            toast.success("Reset password link sent successfully")
            return response;
        }catch(error){
            dispatch(setLoading(false))
            setIsEmailSent(false)
            toast.error("Error in sending reset password link, " + error.response.data.message)
            // alert("Error in sending reset password link, " + error.response.data.message)
        }
    }
}

export const resetPassword = (token, newPassword, setIsPasswordReset) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', authEndPoints.RESETPASSWORD_API, {
                token: token,
                newPassword: newPassword,
            })

            dispatch(setLoading(false))
            setIsPasswordReset(true)
            toast.success("Password reset successfully")
            return response
        }catch(error){
            dispatch(setLoading(false))
            toast.error("Error in resetting password, " + error.response.data.message)
            // alert("Error in resetting password, " + error.response.data.message)
        }
    }
}