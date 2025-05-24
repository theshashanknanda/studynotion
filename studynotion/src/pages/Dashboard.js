import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

let Dashboard = (props) => {

    let navigate = useNavigate()
    let token = useSelector((state) => state.profile.token)

    // if user is not logged in, redirect to login page
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [token, navigate])

    return (
    <div className="bg-richblack-900 text-white min-h-[100vh] flex flex-col md:flex-row">
        <DashboardNavbar/>
        <div className="flex-1 overflow-auto">
            <Outlet/>
        </div>
    </div>
    )
}

export default Dashboard