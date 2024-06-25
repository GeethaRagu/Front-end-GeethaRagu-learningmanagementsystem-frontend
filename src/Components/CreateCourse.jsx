import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createCourseFailure, createCourseStart, createCourseSuccess } from "../Redux/Slice/courseSlice";

const CreateCourse = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);
  const initialValues = {
    coursename:"",
    coursecategory:"",
    coursedescription:"",
    courseprice:""
  };
  const validationschema = Yup.object().shape({
    coursename: Yup.string().required("Field is empty"),
    coursecategory: Yup.string().required("Field is empty"),
    coursedescription: Yup.string().required("Field is empty"),
    courseprice: Yup.string().required("Field is empty"),
  });
  //Call create course API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      dispatch(createCourseStart());
      const response = await fetch(`${apiurl}/course/createcourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        return dispatch(createCourseFailure(data.message));
      }
      if (response.ok) {
        dispatch(createCourseSuccess(data));
        navigate("/courses");
      }
    } catch (error) {
      dispatch(createCourseFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen">
      <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
        <div className=" flex-1 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
          <h2 className=" text-4xl p-3 text-center">Create Course</h2>
          <Formik  initialValues={initialValues} validationSchema={validationschema} onSubmit={handleSubmit}>
            <Form>
              <div className="mt-5">
                <label className="pr-12">Course name :</label>
                <Field type="text" name="coursename" className="w-40 sm:w-full"/>
                <ErrorMessage
                  name="coursename"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-6">Course Category :</label>
                <Field type="text" name="coursecategory" className="w-40 sm:w-full"/>
                <ErrorMessage
                  name="coursecategory"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-2">Course Description :</label>
                <Field type="text" name="coursedescription" className="w-40 sm:w-full"/>
                <ErrorMessage
                  name="coursedescription"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-14">Course price :</label>
                <Field type="text" name="courseprice" className="w-40 sm:w-full"/>
                <ErrorMessage
                  name="courseprice"
                  component="h6"
                  className="error_message"
                />
              </div>

              <div className="flex flex-row">
                <Button
                  className="mt-5 px-2 py-1 bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Spinner
                        color="amber"
                        aria-label="Amber spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Create Course"
                  )}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
