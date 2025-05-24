import HighlightedText from "../components/HighlightedText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png"
import Footer from "../components/Footer";
import BoldText from "../components/BoldText";
import PrimaryButton from "../components/PrimaryButton";

let About = () => {
    const learningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];

    return (
        <div className="bg-richblack-900 text-white min-h-[100vh]">
            <section className="hero-section px-4 mt-8 h-[50vh]">
                <div className="text-center">
                    <button className="bg-[#161D29] py-3 px-6 md:py-4 md:px-8 rounded-full font-semibold text-sm md:text-base
                    hover:scale-90 transition-all duration-200">
                        Become an Instructor
                    </button>
                </div>

                <div className="m-4 md:m-6 text-center">
                    <BoldText>Empower Your Future with </BoldText>
                    <HighlightedText>Coding Skills</HighlightedText>
                </div>

                <p className="text-[#838894] font-bold p-4 w-full md:w-[80%] mx-auto text-base md:text-xl">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </p>

                <div className="flex flex-col md:flex-row w-fit mx-auto gap-4 md:gap-8 m-4">
                    <PrimaryButton color="#FED608" textColor="#111111">Learn More</PrimaryButton>
                    <PrimaryButton color="#161D29" textColor="#FFFFFF">Book a Demo</PrimaryButton>
                </div>
            </section>
            <section>
                <div className="bg-[#161D29] min-h-[40vh] py-8 md:py-12 flex flex-col justify-center items-center">
                    <div className="w-[90%] md:w-[80vw] mx-auto flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl md:text-4xl font-bold px-4 md:px-0">Driving Innovation in Online Education for a</div>
                            <HighlightedText className="text-blue-500 text-2xl md:text-4xl">Brighter Future</HighlightedText>
                        </div>

                        <p className="py-4 opacity-60 text-sm md:text-base w-full md:w-[70%] mx-auto px-4 md:px-0">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap w-[90%] md:w-[90vw] mx-auto gap-4 mt-4 md:mt-[-2%] justify-center px-4 md:px-0">
                    <img src={aboutus1} alt="About Us 1" className="w-full md:w-auto" />
                    <img src={aboutus2} alt="About Us 2" className="w-full md:w-auto" />
                    <img src={aboutus3} alt="About Us 3" className="w-full md:w-auto" />
                </div>

                <div className="text-lg md:text-2xl font-semibold w-[90%] md:w-[60vw] mx-auto mt-8 md:mt-10 px-4 md:px-0">
                    "We are passionate about revolutionizing the way we learn. Our innovative platform <span className="text-[#15D7FA]">combines technology</span>, <span className="text-[#BA5F1F]">expertise</span>, and community to create an <span className="text-[#F4B81C]">unparalleled educational experience.</span>"
                </div>
            </section>

            <hr className="my-8 opacity-40 mx-4"></hr>

            <section className="w-[90%] md:w-[80vw] mx-auto flex flex-col md:flex-row flex-wrap justify-center px-4 md:px-0">
                <div className="flex flex-col gap-6 w-full md:w-[50%] mb-8 md:mb-0">
                    <h1 className="bg-gradient-to-r from-[rgb(160,51,144)] to-[#FD3D26] bg-clip-text text-transparent font-bold text-3xl md:text-4xl text-center md:text-left">Our Founding Story</h1>
                    <div className="flex flex-col gap-4">
                        <p className="opacity-60 text-center md:text-left text-sm md:text-base">
                            Our e-learning platform was born out of a shared vision and passion for transforming education. The story began when our founders recognized the need for accessible, high-quality learning experiences that could empower individuals from all walks of life.
                        </p>
                        <p className="opacity-60 text-center md:text-left text-sm md:text-base">
                            What started as a small team of educators and technologists has now grown into a global platform that has empowered thousands of learners and instructors worldwide.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-[50%]">
                    <img src={FoundingStory} alt="" className="w-full h-auto" />
                </div>
            </section>

            <section className="bg-[#161D29] min-h-[200px] md:h-[14vw] mt-10 py-8 md:py-0">
                <div className="w-[90%] md:w-[60vw] h-full mx-auto grid grid-cols-2 md:flex md:justify-between items-center gap-8 md:gap-0">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h1 className="text-2xl md:text-4xl font-black">5K</h1>
                        <p className="text-xs md:text-sm opacity-60 text-center md:text-left">Active Students</p>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h1 className="text-2xl md:text-4xl font-black">10+</h1>
                        <p className="text-xs md:text-sm opacity-60 text-center md:text-left">Mentors</p>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h1 className="text-2xl md:text-4xl font-black">200+</h1>
                        <p className="text-xs md:text-sm opacity-60 text-center md:text-left">Courses</p>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h1 className="text-2xl md:text-4xl font-black">50+</h1>
                        <p className="text-xs md:text-sm opacity-60 text-center md:text-left">Awards</p>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="flex flex-wrap w-[90%] md:w-[80vw] mx-auto gap-18 mt-10 justify-between items-center px-4 md:px-0">
                    <div className="flex flex-col gap-6 w-full md:w-[50%]">
                        <h1 className="text-[#BA5F1F] font-medium text-3xl md:text-4xl text-center md:text-left">Our Vision</h1>
                        <div className="flex flex-col gap-4">
                            <p className="text-center md:text-left opacity-70 font-medium text-sm md:text-base">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full md:w-[50%]">
                        <h1 className="text-[#15D7FA] font-medium text-3xl md:text-4xl text-center md:text-left">Our Mission</h1>
                        <div className="flex flex-col gap-4">
                            <p className="text-left opacity-70 font-medium w-[80%]">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#161D29] h-[14vw] mt-10">
                <div className="w-[60vw] h-full mx-auto flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black">5K</h1>
                        <p className="text-sm opacity-60">Active Students</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black">10+</h1>
                        <p className="text-sm opacity-60">Mentors</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black">200+</h1>
                        <p className="text-sm opacity-60">Courses</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black">50+</h1>
                        <p className="text-sm opacity-60">Awards</p>
                    </div>
                </div>
            </section>

            <section className="mt-8 md:mt-12 pb-8 md:pb-12 px-4 md:px-0">
                <div className="w-[90%] md:w-[80vw] mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-0">
                    {
                        learningGridArray.map((item, index) => {
                            return (<div key={index}
                            className={` 
                            ${item.order === -1 && "lg:col-span-2 bg-transparent"}
                            ${item.order % 2 === 0 && "bg-[#2B333F]"} 
                            ${item.order % 2 !== 0 && "bg-[#161D29]"}
                            ${item.order === 3 && "lg:col-start-2"}
                            rounded-lg lg:rounded-none
                            `}>
                                {
                                    index === 0 ? 
                                    (<div className="min-h-[300px] text-center md:text-left flex flex-col gap-4 p-6">
                                        <div>
                                            <div>
                                                <h1 className="text-white font-medium text-2xl md:text-4xl">World-Class Learning for</h1>
                                                <h1 className="text-[#15D7FA] font-medium text-2xl md:text-4xl">Anyone, Everywhere</h1>
                                            </div>

                                            <p className="text-white opacity-70 font-medium w-full md:w-[80%] mt-4 text-sm md:text-base">
                                                Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations 1  worldwide
                                            </p>
                                        </div>

                                        <button className="bg-[#CBAA0B] w-full md:w-[30%] p-2 mb-2 rounded-md text-black hover:opacity-60 text-sm md:text-base">Learn More</button>

                                    </div>)
                                    :
                                    (<div className="min-h-[250px] md:h-[300px] flex flex-col justify-start gap-4 p-6">
                                        <div className="font-semibold text-center md:text-left pt-4 text-lg md:text-xl">
                                            {item.heading}
                                        </div>
                                        <div className="font-medium opacity-70 text-sm text-center md:text-left">
                                            {item.description}
                                        </div>
                                    </div>)
                                }
                            </div>)
                        })
                    }
                </div>
            </section>

            <section>
                <Footer></Footer>
            </section>
        </div>
    )
}

export default About;