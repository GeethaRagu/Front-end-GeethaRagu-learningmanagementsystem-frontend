import React from "react";
import { useSelector } from "react-redux";

const ViewPerformance = () => {
  /**state from redux**/
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log(currentuser);
  return (
    <div className="mx-10">
      <div className="text-white dark:text-black">
        <span>Hi ! </span>
        <span className="text-xl font-bold">
          {currentuser.rest.username && currentuser.rest.username}
        </span>
        <h4 className="pt-3">Check out your details below:</h4>
        <div>
          <span>Your mentor</span>
          <span>
            {currentuser.rest.mentorname && (
              <span className="px-5 text-xl font-bold">
                {currentuser.rest.mentorname}
              </span>
            )}
            {!currentuser.rest.mentorname && (
              <span className="px-5 text-xl font-bold">
                Mentor not assigned
              </span>
            )}
          </span>
        </div>
        <div>
          <span>Your Perfomance rating</span>
          <span>
            {currentuser.rest.performance && (
              <span className="px-5 text-xl font-bold">
                {currentuser.rest.performance}
              </span>
            )}
            {!currentuser.rest.performance && (
              <span className="px-5 text-xl font-bold">
                Performance not rated yet
              </span>
            )}
          </span>
        </div>
        <div>
          <span>Your Assessment score</span>
          <span>
            {currentuser.rest.assessment && (
              <span className="px-5 text-xl font-bold">
                {currentuser.rest.assessment}
              </span>
            )}
            {!currentuser.rest.assessment && (
              <span className="px-5 text-xl font-bold">
                Not yet assessed
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewPerformance;
