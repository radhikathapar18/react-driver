import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";

const Team = ({ userDetails, updateTeamData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("teamData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(userDetails); 
    }
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem("teamData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setData(userDetails);
  }, [userDetails]);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEdit = (id) => {
    console.log("Edit:", id);
    
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center">
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEdit(row.id)}>
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          pageSize={10}
          onEditCellChangeCommitted={(params) => {
            const { id, field, value } = params;
            const updatedData = data.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            );
            setData(updatedData);
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
