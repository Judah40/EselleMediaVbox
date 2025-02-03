import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserData {
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  address: string;
  role: string;
  phoneNumber: string;
  profile_picture?: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface UserDetailsTableProps {
  data: UserData[];
}

const UserDetailsTable: React.FC<UserDetailsTableProps> = ({ data = [] }) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const [activeStates, setActiveStates] = useState<boolean[]>(
    data.map((user) => user.isActive)
  );

  const getInitials = (firstName: string, lastName: string): string =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const handleToggleActivation = (index: number) => {
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
    // API call for status update would go here
  };

  const filteredData = data.filter((user) =>
    `${user.firstName} ${user.middleName || ""} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const DetailRow: React.FC<{ label: string; value: string | undefined }> = ({
    label,
    value,
  }) => (
    <div className="flex justify-between">
      <span className="font-medium text-muted-foreground">{label}:</span>
      <span className="text-right">{value || "N/A"}</span>
    </div>
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((user, index) => (
            <Card
              key={user.username}
              className="w-full max-w-2xl mx-auto shadow-lg"
            >
              <CardHeader className="border-b p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={user.profile_picture}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">
                        {user.firstName} {user.middleName} {user.lastName}
                      </h2>
                      <p className="text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleToggleActivation(index)}
                    variant={activeStates[index] ? "destructive" : "default"}
                    className="ml-4"
                  >
                    {activeStates[index] ? "Deactivate" : "Activate"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <DetailRow label="Email" value={user.email} />
                    <DetailRow label="Phone" value={user.phoneNumber} />
                    <DetailRow label="Date of Birth" value={user.dateOfBirth} />
                  </div>
                  <div className="space-y-2">
                    <DetailRow label="Gender" value={user.gender} />
                    <DetailRow label="Role" value={user.role} />
                    <DetailRow label="Address" value={user.address} />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Status: {activeStates[index] ? "Active" : "Inactive"}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailsTable;
