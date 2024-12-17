import { CircleX } from "lucide-react";
import React from "react";

const Modal = ({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  onClose: (value: boolean) => void;
  isOpen: boolean;
}) => {
  if (!isOpen) return;
  return (
    <div className="inset-0 transition-shadow duration-150 ease-in-out z-50 bg-black overflow-y-auto  items-center flex flex-col fixed w-full flex-1 bg-opacity-50">
      <div className="w-11/12 md:w-[600px] lg:w-[1000px]  mt-6 p-4">
        <div className="w-full relative  flex justify-end">
          <button
            onClick={() => {
              onClose(false);
            }}
            className="absolute right-8 top-4 z-50" 
          >
            <CircleX size={30} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
