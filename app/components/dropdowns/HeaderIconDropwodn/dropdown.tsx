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
import { userAuth } from "@/useContext";
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
  const { username, userProfilePicture } = userAuth();
  // const [userProfilePicture, setUserProfilePicture] = useState<string>("");

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0  bg-background",
      }}
    >
      <DropdownTrigger>
        {userProfilePicture ? (
          <Avatar src={userProfilePicture} />
        ) : (
          "Profile Picture"
        )}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
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
            {username && userProfilePicture ? (
              <User
                name={username.username}
                description={username.email}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500",
                }}
                avatarProps={{
                  size: "sm",
                  src: userProfilePicture,
                }}
              />
            ) : null}
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
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
