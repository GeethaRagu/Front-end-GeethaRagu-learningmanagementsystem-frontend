import { Button, Spinner, Textarea } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Raisequery = () => {
  /**State for loading **/
  const { loading } = useSelector((state) => state.user);

  const navigate= useNavigate();
    const initialValues={
        username:"",
        email:"",
        query:""
    }


    const validationschema = Yup.object().shape({
      username: Yup.string().required("Field is empty"),
      email: Yup.string().required("Field is empty"),
      query: Yup.string().required("Field is empty"),
      
    });
    const apiurl = import.meta.env.VITE_API_URLKEY;
    const handleSubmit = async(values)=>{
      try {
       
        const response = await fetch(`${apiurl}/user/postquery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        //console.log(data);
        
        if (response.ok) {
          toast.success("Query posted successfully.Will get notification soon")
          navigate("/");
        }
      } catch (error) {
        toast(error.message);
      }

    }
    return (
        <div className='min-h-screen mb-5 text-white dark:text-black mx-10'>
            <Formik
            initialValues={initialValues}
            validationSchema={validationschema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mt-5">
                <label className="pr-2">Username :</label>
                <Field type="text" name="username" placeholder="Your name" />
                <ErrorMessage
                  name="username"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-10">Email :</label>
                <Field type="email" name="email" placeholder="name@gmail.com" />
                <ErrorMessage
                  name="email"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-9">Query :</label>
                < Field type="textarea" name="query" className="w-50 max-h-15"/>
                <ErrorMessage
                  name="query"
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
                    "Send Query"
                  )}
                </Button>
            
              </div>
            </Form>
          </Formik>
        </div>
    );
};

export default Raisequery;