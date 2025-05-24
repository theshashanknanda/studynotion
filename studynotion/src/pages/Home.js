import HighlightedText from "../components/HighlightedText";
import BoldText from "../components/BoldText";
import PrimaryButton from "../components/PrimaryButton";
import banner from "../assets/Images/banner.mp4"
import CodeBanner from "../components/CodeBanner";
import { HomePageExplore } from "../data/homepage-explore";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TimeLineSection from "../components/TimeLineSection";
import know_your_progress from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../assets/Images/Plan_your_lessons.png"
import instructor from "../assets/Images/Instructor.png"
import Footer from "../components/Footer";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";

let Home = () => {
    const [tag, setTag] = useState(HomePageExplore[0].tag)
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    localStorage.removeItem('courseData')

    return (
        <div className="bg-richblack-900 text-white">
            <section className="">
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

            <section className="px-4">
                <video src={banner} loop autoPlay muted className="w-full md:w-[60%] mx-auto p-4 md:p-8"></video>
            </section>

            <section>
                <CodeBanner 
                    title="Coding Potential" 
                    description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." 
                    forward={true} 
                    codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n`}>
                </CodeBanner>
            </section>

            <section>
                <CodeBanner 
                    title="Software Development Ability" 
                    forward={false} 
                    codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n`}>
                </CodeBanner>
            </section>

            <section className="pt-8 pb-16 md:pb-32 px-4">
                <BoldText>Unlock the </BoldText>
                <HighlightedText>Power of Code</HighlightedText>

                <p className="text-[#838894] p-4">Learn to build anything you can imagine</p>

                <div className="overflow-x-auto">
                    <ul className="flex w-fit mx-auto gap-4 md:gap-8 text=[#838894] bg-[#161D29] rounded-full mt-6 whitespace-nowrap">
                        {
                            HomePageExplore.map((item, index) => {
                                return (<li className={item.tag === tag ? "bg-[#000711] rounded-full py-2 px-3 md:py-3 md:px-4 my-2 mx-2 cursor-pointer text-sm md:text-base" : "hover:bg-[#000711] rounded-full py-2 px-3 md:py-3 md:px-4 my-2 mx-2 cursor-pointer text-sm md:text-base"}
                                onClick={(e) => {
                                    setTag(HomePageExplore[index].tag)
                                    setCourses(HomePageExplore[index].courses)
                                }}
                                key={index}>{item.tag}</li>)
                            })
                        }
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full md:w-[90%] lg:w-[80%] mx-auto mt-8">
                    {
                        courses.map((item, index) => {
                            return (
                                <div className="bg-[#161D29] rounded-lg p-4" key={index}>
                                    <div className="text-left">
                                        <p className="font-bold text-lg md:text-xl">{item.heading}</p>
                                        <p className="text-[#838894] mt-4 text-sm md:text-base">{item.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className="bg-white pt-[16%] px-4">
                <div className="flex flex-col md:flex-row gap-4 p-4 w-fit mx-auto">
                    <PrimaryButton color="#FED50A" textColor="#111111">
                        <div className="flex justify-center items-center gap-2">
                            Explore Full Catalog <FaArrowRight/>
                        </div>
                    </PrimaryButton>

                    <PrimaryButton color="#000814" textColor="#FFFFFF">Learn More</PrimaryButton>
                </div>
            </section>

            <section className="bg-white py-8 px-4">
                <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-full md:w-[90%] lg:w-[80vw] mx-auto">
                    <div className="text-center md:text-left md:w-1/2">
                        <HighlightedText>
                            Get the Skills you need for a Job that is in demand
                        </HighlightedText>
                    </div>
                    <div className="p-4 flex flex-col gap-8 md:gap-12 md:w-1/2">
                        <p className="text-black text-center md:text-left">
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <div className="mx-auto md:mx-0">
                            <PrimaryButton color="#FED50A" textColor="#111111">Learn More</PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white p-4 md:p-8">
                <TimeLineSection></TimeLineSection>
            </section>

            <section className="bg-white text-black py-8 md:py-16 px-4">
                <span className="font-bold text-2xl md:text-4xl text-[#2B333F]">Your Swiss Knife for</span>
                <HighlightedText> learning any language</HighlightedText>

                <div className="opacity-80 py-4 md:py-6 text-sm md:text-base px-4">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-[90%] lg:w-[80%] mx-auto overflow-hidden gap-4 md:gap-0">
                    <img src={know_your_progress} alt="" className="w-[60%] md:w-[30%] h-auto md:-mr-16"/>
                    <img src={compare_with_others} alt="" className="w-[60%] md:w-[30%] h-auto"/>
                    <img src={plan_your_lessons} alt="" className="w-[60%] md:w-[30%] h-auto md:-ml-32"/>
                </div>

                <div className="w-fit mx-auto py-6 md:py-8">
                    <PrimaryButton color="#FED50A" textColor="#111111">Learn More</PrimaryButton>
                </div>
            </section>

            <section className="text-white p-4 md:p-8">
                <div className='flex flex-col md:flex-row items-center gap-8 w-full md:w-[90%] lg:w-[80vw] mx-auto'>
                    <div className="w-full md:w-1/2">
                        <img src={instructor} alt='' className="w-full md:w-[60vw]"/>
                    </div>
                    <div className='w-full md:w-1/2 text-center md:text-left'>
                        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
                            <BoldText>Become an</BoldText>
                            <HighlightedText>Instructor</HighlightedText>
                        </div>
                        <p className='opacity-80 py-6'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>

                        <div className="mx-auto md:mx-0">
                            <PrimaryButton color="#FED50A" textColor="#111111">
                                <div className="flex justify-center items-center gap-2">
                                    Start Learning Today <FaArrowRight/>
                                </div>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <Footer></Footer>
            </section>
    </div>
    )
}

export default Home;