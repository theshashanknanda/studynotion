import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import { getAllCategories, showAllCategoryCourses } from '../services/operations/coursesApi';

const Catalog = () => {
    const {id} = useParams()
    const { search } = useLocation();
    const query = new URLSearchParams(search);

    const name = query.get('name');

    let token = useSelector((state) => state.profile.token)
    let user = useSelector((state) => state.profile.user)

    const dispatch = useDispatch()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        dispatch(showAllCategoryCourses(token, id, setCourses))
    }, [id])

    // const courses = [
    //     {
    //       title: "The Complete Python Bootcamp From Zero to Hero in Python",
    //       price: "Rs. 1,200",
    //       image: "/images/python-course.jpg", // replace with real path
    //       bestseller: true,
    //     },
    //     {
    //       title: "The Complete Python Bootcamp From Zero to Hero in Python",
    //       price: "Rs. 1,200",
    //       image: "/images/java-course.jpg",
    //       bestseller: false,
    //     },
    //     {
    //       title: "The Complete Python Bootcamp From Zero to Hero in Python",
    //       price: "Rs. 1,200",
    //       image: "/images/dev-course.jpg",
    //       bestseller: false,
    //     },
    //   ];

  return (
    <div>
        <div className='text-left bg-[#0f172a]'>
        
        <div className="text-white px-6 py-10 w-[80%] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-medium">Name</span>
        </nav>
  
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-white">{name}</h1>
      </div>
  
      
      </div>
      <section className="text-white px-6 py-10 w-[80%] mx-auto text-left">
      <h2 className="text-2xl font-semibold mb-6">Courses to get you started</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link to={`/course/${course._id}`} state={{course}}>
            <div key={index} className="bg-[#1e293b] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt="thumbnail"
                className="w-full h-48 object-cover"
              />
              {course.bestseller && (
                <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Bestseller
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium leading-5 mb-1">{course.courseName}</h3>
              <p className="text-gray-400 text-xs mb-1">{course.courseDescription}</p>
              <p className="text-lg font-semibold">{course.price}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
    </div>
  )
}

export default Catalog
