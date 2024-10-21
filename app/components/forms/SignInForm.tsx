"use client";

// components/forms/SignInForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@/app/lib/signInValidation";
import Link from "next/link";

type UserFormValues = {
  email: string;
  password: string;
};
const SignInForm = () => {
  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form data", values);
    // Add logic for sign-in or API call here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full items-center justify-center flex flex-col   gap-4">
          <div className="form-control flex flex-col w-full lg:w-8/12 ">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className=" p-3 rounded"
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
              className=" p-3 rounded"
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
            Sign In
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
