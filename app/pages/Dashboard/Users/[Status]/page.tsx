'use client'

import React, { useEffect, useState } from "react";
import { User } from "../../types/users.types";
import { handleGetAllUsers } from "@/app/api/AdminApi/usersApi/api";
import { 
  FileSpreadsheet, 
  UserPlus, 
  Search,
  Filter,
  ChevronDown 
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { exportToCSV } from "../../(component)/ExportUsersfunction";

const UsersManagementPage: React.FC = () => {
  const [data, setAllUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await handleGetAllUsers(1);
        setAllUsers(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search and Filter Logic
  useEffect(() => {
    let result = data;

    // Search Filter
    if (searchTerm) {
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status Filter
    if (filter !== 'all') {
      result = result.filter(user => user.isActive === (filter === 'active'));
    }

    setFilteredData(result);
  }, [searchTerm, filter, data]);

  const renderUserTable = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                  user.isActive ? 'default' : 'destructive'
                  }
                  className="capitalize"
                >
                  {user.isActive ? 'active' : 'inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100">
                      Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">User Management</CardTitle>
            <CardDescription>Manage and oversee all platform users</CardDescription>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => exportToCSV(filteredData)}
              className="bg-green-50 hover:bg-green-100 text-green-700"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" /> 
              Export CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="mr-2 h-4 w-4" /> 
              Invite User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center mb-4 space-x-4">
            <div className="flex items-center space-x-2 w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search users by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-gray-50">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    All Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('active')}>
                    Active Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('pending')}>
                    Pending Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('inactive')}>
                    Inactive Users
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm text-gray-500">
              {filteredData.length} Users
            </div>
          </div>

          {renderUserTable()}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementPage;