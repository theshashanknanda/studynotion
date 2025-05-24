import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addCompletedLecture } from "../../services/operations/coursesApi";

const ViewCourse = () => {
  const token = useSelector((state) => state.profile.token)

  const dispatch = useDispatch()
  const { state } = useLocation();
  const { course } = state || {};

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const currentSection = course?.courseContent?.[currentSectionIndex];
  const currentLecture = currentSection?.subSection?.[currentLectureIndex];

//   useEffect(() => {
//     console.log("Course data:", course);
//   }, [course]);

  const handleLectureCompletion = (subsectionId) => {
    console.log("Marking as complete:", subsectionId);
    // add completed lecture to user object in db
    dispatch(addCompletedLecture(token, subsectionId, course._id))
  };

  const goToNextLecture = () => {
    handleLectureCompletion(currentLecture?._id);

    const currentSubsections = course.courseContent[currentSectionIndex].subSection;

    if (currentLectureIndex + 1 < currentSubsections.length) {
      setCurrentLectureIndex(currentLectureIndex + 1);
    } else if (currentSectionIndex + 1 < course.courseContent.length) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentLectureIndex(0);
    } else {
      toast.success("You have completed all lectures")
    }
  };

  const goToLecture = (sectionIdx, lectureIdx) => {
    setCurrentSectionIndex(sectionIdx);
    setCurrentLectureIndex(lectureIdx);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0F0F0F] text-white text-left">
      {/* Sidebar */}
      <div className="w-full lg:w-[300px] bg-[#1A1A1A] p-4 lg:h-screen lg:overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Course Content</h2>
        {course?.courseContent?.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-6">
            <p className="text-[#CBAB09] font-medium text-sm sm:text-base">{section.sectionName}</p>
            <div className="mt-2 space-y-1">
              {section.subSection?.map((sub, subIdx) => {
                const isActive =
                  currentSectionIndex === sectionIdx &&
                  currentLectureIndex === subIdx;
                return (
                  <div
                    key={sub._id}
                    className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                      ? "bg-[#CBAB09] text-white"
                      : "text-gray-300 hover:bg-[#2C2C2C]"}`}
                    onClick={() => goToLecture(sectionIdx, subIdx)}
                  >
                    {sub.title}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Video Content */}
      <div className="flex-1 p-4 sm:p-6 lg:overflow-y-auto">
        <div className="max-w-[1000px] mx-auto">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6">
            {currentLecture?.videoUrl ? (
              <video
                src={currentLecture.videoUrl}
                controls
                className="w-full h-full object-contain"
                controlsList="nodownload"
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Video Available
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold">{currentLecture?.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              {currentLecture?.description}
            </p>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={goToNextLecture}
                className="px-4 sm:px-6 py-2 bg-[#CBAB09] hover:bg-[#b39609] rounded-lg text-black font-medium text-sm sm:text-base transition-colors"
              >
                Next Lecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
