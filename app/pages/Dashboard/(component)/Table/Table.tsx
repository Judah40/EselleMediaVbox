/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box } from "@mui/material";
//Material UI Imports
import { ListItemIcon, MenuItem, lighten } from "@mui/material";
import { AccountCircle, Send, Close, CheckBox } from "@mui/icons-material";
import { User } from "../../types/users.types";
import {
  handleActivateUser,
  handleDeActivateUser,
  handleGetAllUsers,
} from "@/app/api/AdminApi/usersApi/api";

const Table = ({ id }: { id: number }) => {
  const [data, setAllUsers] = useState<User[]>([]);

  ////////////////////////////////////////////////////////////////
  //API REQUEST USEEFFECT
  useEffect(() => {
    handleGetAllUsers(id)
      .then((values) => {
        setAllUsers(values.data.data);
      })
      .catch(() => {});
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        id: "users",
        header: "users",
        columns: [
          // NAME
          {
            accessorFn: (user) => `${user.firstName} ${user.lastName}`,
            header: "Name",
            id: "name",
            Cell: ({ renderedCellValue }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          // EMAIL
          {
            accessorKey: "email",
            header: "Email",
            id: "email",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
          },
          // PHONE
          {
            accessorKey: "phoneNumber",
            header: "Phone",
            id: "phone",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
          },
          // ADDRESS
          {
            accessorKey: "address",
            header: "Address",
            id: "address",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
          },
          // ROLE
          {
            accessorKey: "role",
            header: "Role",
            id: "role",
            filterVariant: "select",
          },
          // STATUS
          {
            accessorKey: "isActive",
            header: "Status",
            id: "status",
            filterVariant: "select",
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>
                  {row.original.isActive ? (
                    <div className="flex items-center gap-2">
                      <p>Active</p>
                      <div className="w-1 h-1 rounded-full bg-green-500" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p>InActive</p>
                      <div className="w-1 h-1 rounded-full bg-red-500" />
                    </div>
                  )}
                </span>
              </Box>
            ),
          },
          // DATE OF BIRTH
          {
            accessorKey: "dateOfBirth",
            header: "Date of Birth",
            id: "dateOfBirth",
            filterVariant: "date",
          },
          // GENDER
          {
            accessorKey: "gender",
            header: "Gender",
            id: "gender",
            filterVariant: "select",
          },
        ],
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enableRowActions: true,
    enableFullScreenToggle: false,
    columnResizeMode: "onChange",
    enableColumnPinning: true,

    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },

    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          if (row.original.isActive) {
            handleDeActivateUser(row.original.id)
              .then(() => {
                alert(`${row.original.firstName} deactivated`);
                closeMenu();
                window.location.reload();
              })
              .catch((error) => {
                alert(`${error.reponse.data}error deleting user`);
              });
          }
          if (!row.original.isActive) {
            handleActivateUser(row.original.id)
              .then(() => {
                alert(`${row.original.firstName} activated`);
                closeMenu();
                window.location.reload();
              })
              .catch((error) => {
                alert(`${error} error activating user`);
              });
          }
        }}
        sx={{ m: 0 }}
      >
        {row.original.isActive ? (
          <div>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            Deactivate User
          </div>
        ) : (
          <div className="flex items-center">
            <ListItemIcon>
              <CheckBox />
            </ListItemIcon>
            <p>Activate User</p>
          </div>
        )}
      </MenuItem>,
    ],
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("deactivating " + row.getValue("name"));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("activating " + row.getValue("name"));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("contact " + row.getValue("name"));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
        </Box>
      );
    },
  });
  return <MaterialReactTable table={table} />;
};

export default Table;
