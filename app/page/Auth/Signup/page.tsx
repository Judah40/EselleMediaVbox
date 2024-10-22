import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import SignupForm from "@/app/components/forms/SignupForm";

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-[100vh]">
      {/* Sign-up form */}
      <div className="lg:w-6/12 w-full  h-full overflow-y-auto flex flex-col items-center md:justify-center  p-4">
          <Link href={"/page/Home"}>
            <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
          </Link>{" "}
          <p className="text-4xl text-white">Welcome!</p>
          {/* Container with fixed max width for the form */}
          <div className="w-full ">
            <SignupForm />
          </div>
          <div>
            <p className="text-white text-center">
              Already have an account?{" "}
              <Link
                href={"/page/Auth/Signin"}
                className="underline text-cyan-500"
              >
                Sign In
              </Link>
            </p>
          </div>
      </div>

      {/* Background Image */}
      <div className="hidden lg:block lg:w-6/12 h-full">
        <Link href={"/page/Home"}>
          <img
            src={"/backgrounds/signupbackgroundImage.png"}
            alt="sign-in-background-image"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}

export default Page;
