import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardSidebar from '../Components/DashboardSidebar';
import DashboardCourses from '../Components/DashboardCourses';
import Quiz from '../Components/Quiz';
import CreateCourse from '../Components/CreateCourse';
import CreateMentor from '../Components/CreateMentor';
import ViewStudents from '../Components/ViewStudents';

const Dashboard = () => {
    const location = useLocation();
    const [tab,setTab]= useState('')
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabUrl = urlParams.get('tab'); //tab = profile
        if(tabUrl){
            setTab(tabUrl)  //profile
        }
    },[location.search])
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-58'>
                <DashboardSidebar />
            </div>
             {tab === 'mycourses' && <DashboardCourses />}
             {tab === 'quiz' && <Quiz />}
             {tab === 'createcourse' && <CreateCourse />}
             {tab === 'mentor' && <CreateMentor />}
             {tab === 'students' && <ViewStudents/>}
        </div>
    );
};

export default Dashboard;