"use client";

// import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserDetailsTable from "../../(component)/Table/Table";
import { PiExportBold } from "react-icons/pi";
import { Plus } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { User } from "../../types/users.types";
import { handleGetAllUsers } from "@/app/api/AdminApi/usersApi/api";
import { exportToCSV } from "../../(component)/ExportUsersfunction";

const Page = () => {
  const { Status } = useParams();
  const [screenSize, setScreenSize] = useState<number | null>(null);
  const [data, setAllUsers] = useState<User[]>([]);

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetAllUsers(Number(Status))
      .then((values) => {
        setAllUsers(values.data.data);
        // console.log(values.data);
      })
      .catch(() => {});
  }, [Status]);
  const getScreenWidth = () => {
    const screenWidth = window.innerWidth;
    setScreenSize(screenWidth);
  };

  ////////////////////////////////////////////////////////////////
  //SCREEN SIZE USEFFECT

  useEffect(() => {
    // Set up the resize event listener
    window.addEventListener("resize", getScreenWidth);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", getScreenWidth);
  }, []);
  useEffect(() => {
    getScreenWidth();
  });

  return (
    <div className="flex-1  ">
      {/* header */}
      <div className=" w-full md:p-4 py-4 flex items-center">
        <div>
          <p className="md:text-2xl font-bold">Users</p>
          <p className="text-sm">Find all users here</p>
        </div>
        <div className="flex-1 p-2  flex justify-end gap-4">
          <button
            onClick={() => {
              exportToCSV(data);
            }}
            className="md:px-4 md:py-2 px-2 py-1 border flex rounded items-center text-sm gap-2"
          >
            <PiExportBold color="white" size={24} />
            <p className="text-xs">Export CSV</p>
          </button>
          <button className="md:px-4 md:py-2 px-2 py-1 bg-white flex rounded items-center text-sm gap-2">
            <Plus color="black" />
            <p className="text-black text-xs">Invite User</p>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {!screenSize && <Spinner color="white" />}
      </div>

      {data && <UserDetailsTable data={data} />}
    </div>
  );
};

export default Page;
