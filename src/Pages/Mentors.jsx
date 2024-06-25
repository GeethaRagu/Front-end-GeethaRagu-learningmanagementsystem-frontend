import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayMentors } from "../Redux/Slice/courseSlice";
import { Card } from "flowbite-react";

const Mentors = () => {
  /**React hooks**/
  const dispatch = useDispatch();
  /**state from redux**/
  const mentor = useSelector((state) => state.course.mentors);

  /**Call API to display mentors**/
  useEffect(() => {
    fetchData();
  }, []);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/mentor/getmentors`)
      .then((res) => {
        dispatch(displayMentors(res.data));
        //console.log("res",res.data)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
        {mentor &&
          mentor.map((ele, index) => {
            return (
              <Card key={index} className="max-w-sm">
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {ele.mentorName}
                    </h4>

                    <h4 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {" "}
                      {ele.mentorEmail}
                    </h4>
                  </div>
                  <div className="flex-1">
                    <img src="data:image/png;base64,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"></img>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Mentors;
