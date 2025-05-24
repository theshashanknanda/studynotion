import { useState } from "react";
import CountryCode from "../data/countrycode.json";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../services/operations/authApi";
import Loader from "../components/Loader";

const Contact = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    message: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.countryCode || !formData.phoneNumber || !formData.message){
      alert("Please fill all the fields")
      return;
    }
    e.preventDefault()
    dispatch(contactUs(formData, setFormData));
  };

  return (
    <div className="bg-richblack-900 text-white">
      {
        loading ? 
        (<Loader/>) :
        (<div className="w-[90%] md:w-[80vw] mx-auto flex flex-col md:flex-row justify-center gap-8 md:gap-20 pb-8 px-4 md:px-0">
          <div className="text-left flex flex-col gap-8 bg-[#161D29] h-fit w-full md:w-[40%] p-6 md:p-8 border-2 border-black rounded-lg mt-8">
            <div>
              <p className="font-semibold text-lg md:text-xl">Chat with us</p>
              <p className="opacity-70 text-sm md:text-base">
                Our friendly team is here to help @mail address
              </p>
            </div>
            <div>
              <p className="font-semibold text-lg md:text-xl">Visit us</p>
              <p className="opacity-70 text-sm md:text-base">
                Come and visit our website at www.address.com
              </p>
            </div>
            <div>
              <p className="font-semibold text-lg md:text-xl">Call us</p>
              <p className="opacity-70 text-sm md:text-base">
                Mon - Fri From 8AM to 5PM +123 456 7890
              </p>
            </div>
          </div>
  
          <div className="w-full md:w-[40%]">
            <div className="bg-richblack-900 text-white">
              <div className="mx-auto">
                <div className="w-full">
                  <div className="text-2xl md:text-4xl font-semibold text-center md:text-left my-6">
                    Got an Idea? We've got the skills! Let's team up
                  </div>
                  <p className="opacity-80 mb-1 text-center md:text-left text-sm md:text-base">
                    Build skills for today, tomorrow, and beyond.
                  </p>
                  <div className="text-blue-500 text-center md:text-left mb-6">
                    <a href="#">
                      <i>Education to future proof your career.</i>
                    </a>
                  </div>
  
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-4">
                    <div className="flex flex-col md:flex-row gap-6 md:justify-between">
                      <div className="w-full md:w-[48%]">
                        <div className="text-left pb-2">First Name</div>
                        <div className="relative flex items-center gap-4">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
  
                      <div className="w-full md:w-[48%]">
                        <div className="text-left pb-2">Last Name</div>
                        <div className="relative flex items-center gap-4">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
  
                    <div>
                      <div className="text-left pb-2">Email</div>
                      <input
                        className="w-full bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                        name="email"
                        type="email"
                        placeholder="abc@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
  
                    <div className="flex flex-col md:flex-row gap-6 md:justify-between">
                      <div className="w-full md:w-[30%]">
                        <div className="text-left pb-2">Country</div>
                        <div className="relative flex items-center gap-4 bg-[#111621] pr-2 rounded-md">
                          <select
                            className="w-full p-3 bg-[#111621] outline-none focus:outline-[#CBAA0B]"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                          >
                            {CountryCode.map((item, index) => (
                              <option value={item.code} key={index}>
                                {item.country} {item.code}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
  
                      <div className="w-full md:w-[70%]">
                        <div className="text-left pb-2">Phone Number</div>
                        <div className="relative flex items-center gap-4">
                          <input
                            className="w-full bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B]"
                            name="phoneNumber"
                            type="text"
                            placeholder="123 456 7890"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
  
                    <div>
                      <label htmlFor="message" className="text-left block pb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full bg-[#111621] rounded-md p-3 outline-none focus:outline-[#CBAA0B] text-white resize-none"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
  
                    <button
                      type="submit"
                      className="bg-[#CBAA0B] w-full p-3 rounded-md text-black hover:opacity-60 text-sm md:text-base font-medium"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }

      <Footer></Footer>
    </div>
  );
};

export default Contact;