import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMentors } from "../Redux/Slice/courseSlice";
import { Card } from "flowbite-react";
import { viewStudents } from "../Redux/Slice/userSlice";

const ViewStudents = () => {
  /**React hooks**/
  const dispatch = useDispatch();

  const students = useSelector((state) => state.user.students);
  /**Call API to display courses**/
  useEffect(() => {
    fetchData();
  }, []);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/user/viewstudents`)
      .then((res) => {
        dispatch(viewStudents(res.data));
        // console.log("res",res.data);
      })
      .catch((error) => console.log(error));
  };
  // console.log(students);
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
        {students &&
          students.map((ele, index) => {
            return (
              <>
                {ele.courses.length > 0 && !ele.isAdmin && (
                  <Card key={index} className="max-w-sm">
                    <>
                      <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Name: {ele.username}
                      </h5>
                      <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                        Email: {ele.email}
                      </h6>
                      <h5 className=" text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                        Courses
                      </h5>
                      {ele.courses.map((e,index1) => {
                        return (
                          <div key={index1}>
                            <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                              {e.coursename}
                            </h6>
                          </div>
                        );
                      })}
                    </>
                  </Card>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ViewStudents;
