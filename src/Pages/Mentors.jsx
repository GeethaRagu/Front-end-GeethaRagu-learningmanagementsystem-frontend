import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMentors } from "../Redux/Slice/courseSlice";
import {  Card } from "flowbite-react";


const Mentors = () => {
      /**React hooks**/
  const dispatch = useDispatch();
  /**state from redux**/
   const mentor = useSelector((state) => state.course.mentors);
 
   /**Call API to display courses**/
   useEffect(() => {
     fetchData();
   }, []);
   const apiurl = import.meta.env.VITE_API_URLKEY;
   const fetchData = async () => {
     await axios
       .get(`${apiurl}/mentor/getmentors`)
       .then((res) => {
         dispatch(displayMentors(res.data));
         console.log("res",res.data)
       })
       .catch((error) => console.log(error));
   };
 
  
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
        {mentor &&
          mentor.map((ele, index) => {
            return (
              <Card key={index} className="max-w-sm">
                <span className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Mentor Name :
                </span>
                <span text-4xl font-bold tracking-tight text-gray-900 dark:text-white>{ele.mentorName}</span>

                <span className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Mentor Email :
                </span>
                <span text-4xl font-bold tracking-tight text-gray-900 dark:text-white>{ele.mentorEmail}</span>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Mentors;
