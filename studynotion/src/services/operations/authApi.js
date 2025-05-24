import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSignUpData } from "../../reducers/slices/authSlice";
import { setToken, setUser } from "../../reducers/slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { authEndPoints, contactusEndpoint, profileEndpoints } from "../apis";
import toast, { Toaster } from 'react-hot-toast';

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('POST', authEndPoints.SENDOTP_API, {
                email: email,
            })
            dispatch(setLoading(false))
            toast.success("OTP sent successfully")
            navigate('/verifyOtp')
            return response;
        }catch(error){
            if(error.response){
                // alert("Error in sending OTP, " + error.response.data.message)
                toast.error("Error in sending OTP, " + error.response.data.message)
            }else{
                console.log(error.message)
            }
            dispatch(setLoading(false))
            navigate('/signup')
        }
    }
}

export const signupUser = (data, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            await apiConnector('POST', authEndPoints.SIGNUP_API, {...data})
            
            // user creation successful
            // set loadin false & redirect user to login page
            navigate('/login')
            toast.success("Signup successful, please login")
        }catch(error){
            // alert("Error in signing up, " + error.response.data.message)
            toast.error("Error in signing up, " + error.response.data.message)
            navigate('/signup')
        }

        dispatch(setLoading(false))
        dispatch(setSignUpData(null))
    }
}

export const loginUser = (data, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            const response = await apiConnector('POST', authEndPoints.LOGIN_API, {...data})
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            
            // user login successful
            // redirect user to home page
            dispatch(setLoading(false))
            toast.success("Login successful")
            navigate('/dashboard')
        }catch(error){
            dispatch(setLoading(false))
            toast.error("Error in logging in, " + error.response.data.message)
            navigate('/login')
        }
    }
}

export const updateUser = (data, token, setAreChangesSaved, setSignupData) => {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            const response = await apiConnector('PUT', profileEndpoints.UPDATE_USER_PROFILE_API, {...data}, {'Authorization': `Bearer ${token}`})
            setAreChangesSaved(true)
            dispatch(setUser(response.data.data))
            setSignupData({firstName: data.firstName, lastName: data.lastName, password: '', newPassword: ''})
            // alert("User updated successfully")
            toast.success("User updated successfully")
        }catch(error){
            // alert("Error in updating user, " + error.response.data.message)
            toast.error("Error in updating user, " + error.response.data.message)
        }

        dispatch(setLoading(false))
    }
}

export const contactUs = (data, setFormData) => {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            await apiConnector('POST', contactusEndpoint.CONTACT_US_API, {...data})
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                countryCode: "",
                phoneNumber: "",
                message: "",
              });
            // alert("We've received your response!")
            toast.success("We've received your response!")
        }catch(error){
            // alert("Error in sending message, " + error.response.data.message)
            toast.error("Error in sending message, " + error.response.data.message)
        }

        dispatch(setLoading(false))
    }
}
