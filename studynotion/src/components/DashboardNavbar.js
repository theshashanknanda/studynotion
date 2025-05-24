import React, { useState } from 'react'
import { sidebarLinks } from '../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import * as FaIcons from 'react-icons/vsc'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import LogoutModal from './LogoutModal';
import { setToken } from '../reducers/slices/profileSlice'

const DashboardNavbar = () => {
    /*
    Common for both,
    - My Profile

    For students,
    - Enrolled Courses
    - Cart

    For instructors,
    - Dashboard
    - My Courses
    - Add Course

    Common for both,
    Logout
    */

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state.profile.user)
    const userType = user?.accountType

    const studentItems = sidebarLinks.filter((item) => item.type === 'student' || item.type === 'both')
    const instructorItems = sidebarLinks.filter((item) => item.type === 'instructor' || item.type === 'both')

    const matchRoute = (route) => {
        return location.pathname === route;
    }

    const logoutHandler = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('currentStage')
            dispatch(setToken(null))
            navigate('/')
        }
    
        const [isOpen, setIsOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    const onClose = () => {
        setIsOpen(false)
    }
    
    const onYes = () => {
        logoutHandler()
        setIsOpen(false)
    }
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

  return (
    <div className='bg-[#161D29] w-full md:w-[250px] lg:w-[20vw] min-h-[64px] md:min-h-[100vh] relative'>
        {/* Mobile Menu Button */}
        <button 
            className='md:hidden absolute right-4 top-4 text-white text-2xl p-2'
            onClick={toggleMobileMenu}
        >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu - Hidden on mobile unless menu is open */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block h-screen overflow-y-auto`}>
            {userType === 'Instructor' ? (
                <nav className='pt-16 md:pt-4'>
                    {instructorItems.map((item, index) => {
                        const Icon = FaIcons[item.icon]
                        return (
                            <div key={index}>
                                {item.id === 7 ? (
                                    <div>
                                        <div 
                                            className={`flex items-center justify-start gap-2 py-3 md:py-4 px-4 md:px-8 cursor-pointer hover:opacity-70 ${
                                                matchRoute(item.path) ? "text-yellow-400 bg-[#3D2A01] border-l-2 border-yellow-600" : "text-[#b4b8c1]"
                                            }`} 
                                            onClick={() => {
                                                setIsOpen(true)
                                                setIsMobileMenuOpen(false)
                                            }}
                                        >
                                            {Icon && <Icon className='w-[20px] h-[20px]' />}
                                            <span className='text-sm md:text-base'>{item.name}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <a 
                                            className={`flex items-center justify-start gap-2 py-3 md:py-4 px-4 md:px-8 cursor-pointer hover:opacity-70 ${
                                                matchRoute(item.path) ? "text-yellow-400 bg-[#3D2A01] border-l-2 border-yellow-600" : "text-[#b4b8c1]"
                                            }`} 
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {Icon && <Icon className='w-[20px] h-[20px]' />}
                                            <span className='text-sm md:text-base'>{item.name}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            ) : (
                <nav className='pt-16 md:pt-4'>
                    {studentItems.map((item, index) => {
                        const Icon = FaIcons[item.icon]
                        return (
                            <div key={index}>
                                {item.id === 7 ? (
                                    <div>
                                        <div 
                                            className={`flex items-center justify-start gap-2 py-3 md:py-4 px-4 md:px-8 cursor-pointer hover:opacity-70 ${
                                                matchRoute(item.path) ? "text-yellow-400 bg-[#3D2A01] border-l-2 border-yellow-600" : "text-[#b4b8c1]"
                                            }`} 
                                            onClick={() => {
                                                setIsOpen(true)
                                                setIsMobileMenuOpen(false)
                                            }}
                                        >
                                            {Icon && <Icon className='w-[20px] h-[20px]' />}
                                            <span className='text-sm md:text-base'>{item.name}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <a 
                                            className={`flex items-center justify-start gap-2 py-3 md:py-4 px-4 md:px-8 cursor-pointer hover:opacity-70 ${
                                                matchRoute(item.path) ? "text-yellow-400 bg-[#3D2A01] border-l-2 border-yellow-600" : "text-[#b4b8c1]"
                                            }`} 
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {Icon && <Icon className='w-[20px] h-[20px]' />}
                                            <span className='text-sm md:text-base'>{item.name}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            )}
        </div>

        <LogoutModal isModalOpen={isOpen} onClose={onClose} onYes={onYes} />
    </div>
  )
}

export default DashboardNavbar
