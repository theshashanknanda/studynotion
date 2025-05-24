// import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: "both"
  },
  {
    id: 2,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: "student",
    icon: "VscMortarBoard",
  },
  {
    id: 3,
    name: "Cart",
    path: "/dashboard/cart",
    type: "student",
    icon: "VscMortarBoard",
  },
  // {
  //   id: 4,
  //   name: "Dashboard",
  //   path: "/dashboard/instructor-dashboard",
  //   type: "instructor",
  //   icon: "VscDashboard",
  // },
  {
    id: 5,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: "instructor",
    icon: "VscVm",
  },
  {
    id: 6,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: "instructor",
    icon: "VscAdd",
  },
  {
    id: 7,
    name: "Logout",
    type: "both",
    icon: "VscShare",
  }

];
