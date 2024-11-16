import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import {
  handleGetUserProfile,
  handleGetUserProfilePicture,
  handleLogout,
} from "@/app/api/AuthApi/api";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
type userProfileType = {
  address: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  isActive: boolean;
  lastName: string;
  phoneNumber: string;
  profile_picture: string;
  username: string;
};
export default function DropdownUi() {
  const [userProfilePicture, setUserProfilePicture] = useState<string>("");
  const [userProfile, setUserProfile] = useState<userProfileType | null>(null);

  useEffect(() => {
    handleGetUserProfilePicture()
      .then((value) => {
        // console.log(value.data.profilePictureUrl);
        setUserProfilePicture(value.data.profilePictureUrl);
      })
      .catch(() => {
        setUserProfilePicture("");
      });
    handleGetUserProfile()
      .then((value) => {
        // console.log(value.data.user);
        setUserProfile(value.data.user);
      })
      .catch(() => {
        setUserProfile(null);
      });
  }, []);
  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200 border border-gray-700 rounded", // change arrow background
        content: "p-0  bg-background",
      }}
    >
      <DropdownTrigger>
        <div className="flex gap-2 items-center border border-gray-700 p-2 rounded">
          {userProfilePicture ? (
            <Avatar src={userProfilePicture} />
          ) : (
            "Profile Picture"
          )}
          <div className="text-xs">
            <p className="text-white">{userProfile && userProfile.username}</p>
            <p className="text-white">{userProfile && userProfile.email}</p>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <ChevronUp size={12} color="white" />
            <ChevronDown size={12} color="white" />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md ",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            {userProfile ? (
              <User
                name={userProfile.username}
                description={userProfile.email}
                classNames={{
                  name: "text-default-600 text-white",
                  description: "text-default-500 text-white",
                }}
                avatarProps={{
                  size: "sm",
                  src: userProfilePicture,
                }}
              />
            ) : null}
          </DropdownItem>
          <DropdownItem key="dashboard">
            <p className="">Dashboard</p>
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            key="logout"
            onPress={() => {
              handleLogout();
              window.location.reload();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
