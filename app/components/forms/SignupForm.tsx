"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "@/app/lib/signupValidation";
import { UserAuth } from "@/useContext";
import { Reg } from "@/app/types/context";
import { Spinner } from "@nextui-org/react";



function SignupForm() {
  const { isLoading, signup } = UserAuth();
  const initialValues: Reg = {
    username: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  };

  const handleSubmit = (values: Reg) => {
    console.log(values);
    console.log("Form Submitted with values: ", values);
    const data: Reg = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      username: values.username,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };
    signup(data);
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
              <Field
                type="text"
                name="username"
                className=" p-3 rounded text-black"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error text-red-500 "
              />
            </div>

            {/* First Name */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>First Name</label>
              <Field
                type="text"
                name="firstName"
                className=" p-3 rounded text-black"
              />
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
              <Field
                type="text"
                name="lastName"
                className=" p-3 rounded text-black"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Middle Name (optional) */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Middle Name (optional)</label>
              <Field
                type="text"
                name="middleName"
                className=" p-3 rounded text-black"
              />
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
              <Field
                type="email"
                name="email"
                className=" p-3 rounded text-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Phone Number */}
            <div className="form-control flex flex-col w-full lg:w-8/12 ">
              <label>Phone Number</label>
              <Field
                type="text"
                name="phoneNumber"
                className=" p-3 rounded text-black"
              />
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
              <Field
                type="text"
                name="address"
                className=" p-3 rounded text-black"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="error text-red-500"
              />
            </div>

            {/* Age */}
            <div className="form-control flex flex-col w-full lg:w-8/12">
              <label>Date of Birth</label>
              <Field
                type="date"
                name="dateOfBirth"
                className="p-3 rounded text-black"
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="error text-red-500"
              />
            </div>
          </div>

          {/* Sex */}
          <div className="form-control flex flex-col w-full lg:w-8/12 ">
            <label>Gender</label>
            <div className="w-full  flex justify-between">
              <div className="w-[45%] p-3 border rounded">
                <label>
                  <Field type="radio" name="gender" value="Male" />
                  Male
                </label>
              </div>
              <div className="w-[45%] p-3 border rounded">
                <label>
                  <Field type="radio" name="gender" value="Female" />
                  Female
                </label>
              </div>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="error text-red-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full lg:w-8/12 bg-cyan-500 p-3 rounded"
          >
            {isLoading ? <Spinner /> : <p>Submit</p>}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
