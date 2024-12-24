"use client";

// components/forms/SignInForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@/app/lib/signInValidation";
import "rsuite/dist/rsuite.min.css";
import { Loader } from "rsuite";
import Cookies from "js-cookie";
import Link from "next/link";
import { handleUserLogin } from "../../api/AuthApi/api";

type UserFormValues = {
  email: string;
  password: string;
};
const SignInForm = () => {
  const [isSignInLoading, setIsSignInLoadin] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: UserFormValues
    // { setSubmitting }: any
  ) => {
    setIsSignInLoadin(true);
    //
    // Add logic for sign-in or API call here
    await handleUserLogin(values)
      .then((response) => {
        //
        setIsSignInLoadin(false);
        setResponseMessage(response.data.message);
        Cookies.set("token", response.data.token);
        Cookies.set("userType", response.data.userType);
        setTimeout(() => {
          // router.push("/pages/Home");
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error(error.response.data.error);
        setIsSignInLoadin(false);
        setResponseMessage(error.response.data.error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full items-center justify-center flex flex-col   gap-4">
          {responseMessage && (
            <div
              className={`${
                responseMessage === "Password is Invalid."
                  ? "bg-red-500"
                  : responseMessage === "Login successful" && "bg-green-200 "
              } p-4 w-full lg:w-8/12 bg-opacity-40 flex items-center justify-center rounded border-white border`}
            >
              {responseMessage && responseMessage}
            </div>
          )}
          <div className="form-control flex flex-col w-full lg:w-8/12 ">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className=" p-3 rounded text-black"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error text-red-500"
            />
          </div>

          <div className="form-control flex flex-col w-full lg:w-8/12">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className=" p-3 rounded text-black"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error text-red-500"
            />
          </div>
          <div className="w-full lg:w-8/12">
            {/* remember me button  */}
            <div className="flex gap-4">
              <input type="checkbox" />
              <p>Remember me</p>
              {/* forget password */}
              <div className="flex-1 items-end w-full flex flex-col">
                <Link href={""} className="underline">
                  Forget Password
                </Link>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full lg:w-8/12 bg-cyan-500 p-3 rounded"
          >
            {isSignInLoading ? <Loader /> : "Sign In"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
