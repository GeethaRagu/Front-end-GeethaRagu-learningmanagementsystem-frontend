import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/Slice/userSlice";
import { HiDocumentText } from "react-icons/hi2";

const DashboardSidebar = () => {
  const { currentuser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab"); //tab = profile
    if (tabUrl) {
      setTab(tabUrl); //profile
    }
  }, [location.search]);
  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
  };

  return (
    <Sidebar className="w-full md:w-58 bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          {currentuser.rest.isAdmin ? (
            <>
              <Link to="/dashboard?createcourse">
                <Sidebar.Item
                  active={tab === "createcourse"}
                  labelColor="dark"
                  as="div"
                >
                  Create Course
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=mentor">
                <Sidebar.Item
                  active={tab === "mentor"}
                  labelColor="dark"
                  as="div"
                >
                  Create Mentor
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=students">
                <Sidebar.Item
                  active={tab === "students"}
                  labelColor="dark"
                  as="div"
                >
                  View Students
                </Sidebar.Item>
              </Link>
              <Link>
                <Sidebar.Item
                  active={tab === "assignmentor"}
                  labelColor="dark"
                  as="div"
                >
                 Assign mentor
                </Sidebar.Item>
              </Link>
            </>
          ) : (
            <>
              <Link>
                <Sidebar.Item
                  active={tab === "mycourses"}
                  labelColor="dark"
                  as="div"
                >
                  My Courses
                </Sidebar.Item>
              </Link>
              <Link>
                <Sidebar.Item
                  active={tab === "myperformance"}
                  labelColor="dark"
                  as="div"
                >
                  My Performance
                </Sidebar.Item>
              </Link>
              <Link>
                <Sidebar.Item
                  active={tab === "assignments"}
                  labelColor="dark"
                  as="div"
                >
                  My Assignments
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=quiz">
                <Sidebar.Item
                  active={tab === "quiz"}
                  labelColor="dark"
                  as="div"
                >
                  Quiz
                </Sidebar.Item>
              </Link>

              <Link>
                <Sidebar.Item
                  active={tab === "query"}
                  labelColor="dark"
                  as="div"
                >
                  Raise Query
                </Sidebar.Item>
              </Link>

              <Sidebar.Item
                icon={HiArrowSmRight}
                className="cursor-pointer"
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
