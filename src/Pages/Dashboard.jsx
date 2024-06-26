import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardCourses from "../Components/DashboardCourses";
import Quiz from "../Components/Quiz";
import CreateCourse from "../Components/CreateCourse";
import CreateMentor from "../Components/CreateMentor";
import ViewStudents from "../Components/ViewStudents";
import LearnersDetails from "../Components/LearnersDetails";
import ViewPerformance from "../Components/ViewPerformance";
import Raisequery from "../Components/Raisequery";
import OnlyAdminPrivateRoute from "../Components/OnlyAdminPrivateRoute";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab"); //tab = profile
    if (tabUrl) {
      setTab(tabUrl); //profile
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row mb-5">
      <div className="md:w-58">
        <DashboardSidebar />
      </div>
      {tab === "mycourses" && <DashboardCourses />}
      {tab === "quiz" && <Quiz />}
      {tab === "myperformance" && <ViewPerformance />}
      {tab === "query" && <Raisequery />}

      {tab === "createcourse" && <CreateCourse />}
      {tab === "mentor" && <CreateMentor />}
      {tab === "students" && <ViewStudents />}
      {tab === "learnersdetails" && <LearnersDetails />}
    </div>
  );
};

export default Dashboard;
