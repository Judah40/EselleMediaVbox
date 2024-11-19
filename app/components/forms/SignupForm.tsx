"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "@/app/lib/signupValidation";

export type UserFormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  address: string;
  age: number;
  sex: string;
};

function SignupForm() {
  const initialValues: UserFormValues = {
    userName: "",
    firstName: "",
    lastName: "",
    middleName: "", // Optional
    email: "",
    phoneNumber: "",
    address: "",
    age: 0,
    sex: "", // Male or Female
  };

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form Submitted with values: ", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full items-center flex flex-col gap-2">
          <div className="flex md:flex-row flex-col w-full justify-between gap-4 ">
            {/* Username */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Username</label>
              <Field type="text" name="username" className=" p-3 rounded" />
              <ErrorMessage
                name="userName"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* First Name */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>First Name</label>
              <Field type="text" name="firstName" className=" p-3 rounded" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error text-red-500"
              />
            </div>
          </div>

          <div className="flex w-full md:flex-row flex-col justify-between gap-4 ">
            {/* Last Name */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Last Name</label>
              <Field type="text" name="lastName" className=" p-3 rounded" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Middle Name (optional) */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Middle Name (optional)</label>
              <Field type="text" name="middleName" className=" p-3 rounded" />
              <ErrorMessage
                name="middleName"
                component="div"
                className="error text-red-500"
              />
            </div>
          </div>

          <div className="flex w-full md:flex-row flex-col justify-between gap-4 ">
            {/* Email */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Email</label>
              <Field type="email" name="email" className=" p-3 rounded" />
              <ErrorMessage
                name="email"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Phone Number */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Phone Number</label>
              <Field type="text" name="phoneNumber" className=" p-3 rounded" />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error text-red-500"
              />
            </div>
          </div>

          <div className="flex w-full md:flex-row flex-col justify-between gap-4 ">
            {/* Address */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Address</label>
              <Field type="text" name="address" className=" p-3 rounded" />
              <ErrorMessage
                name="address"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Age */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Age</label>
              <Field type="number" name="age" className=" p-3 rounded" />
              <ErrorMessage
                name="age"
                component="div"
                className="error text-red-500"
              />
            </div>
          </div>

          {/* Sex */}
          <div className="form-control flex flex-col w-full lg:w-8/12 ">
            <label>Sex</label>
            <div className="w-full  flex justify-between">
              <div className="w-[45%] p-3 border rounded">
                <label>
                  <Field type="radio" name="sex" value="Male" />
                  Male
                </label>
              </div>
              <div className="w-[45%] p-3 border rounded">
                <label>
                  <Field type="radio" name="sex" value="Female" />
                  Female
                </label>
              </div>
            </div>
            <ErrorMessage
              name="sex"
              component="div"
              className="error text-red-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full lg:w-8/12 bg-cyan-500 p-3 rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
