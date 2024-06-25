import { Card } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashboardCourses = () => {
  /**Redux state**/
  const currentuser = useSelector((state) => state.user.currentuser);

  //console.log(currentuser);
  return (
    <div>
      <div className="min-h-screen mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
          {currentuser && (
            <>
              {currentuser.rest.courses.map((ele, index) => {
                return (
                  <Card key={index} className="max-w-sm">
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {ele.coursename} [{ele.coursecategory}]
                    </h5>
                    <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      {ele.coursedescription}
                    </h6>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCourses;
