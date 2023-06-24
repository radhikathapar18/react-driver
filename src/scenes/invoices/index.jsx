import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    const newCustomer = {
      id: customers.length + 1, // Assign a unique id to each row
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
    };

    // Update the table data with the new customer
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);

    // Reset the form data
    setFormData({
      name: "",
      phone: "",
      date: "",
    });

    // Close the form
    setOpenForm(false);
  };

  const [customers, setCustomers] = useState([]);

  return (
    <Box m={2}>
      <Header title="Customer Details" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
        <Box mb={2}>
          <Button variant="contained" color="primary" onClick={handleFormOpen}>
            Add Customer
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          rows={customers}
          columns={columns}
          getRowId={(row) => row.id} // Provide a custom id getter
        />
      </Box>

      <Dialog open={openForm} onClose={handleFormClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
            />
          </Box>
        </DialogContent>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Add
          </Button>
          <Button variant="outlined" onClick={handleFormClose}>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Invoices;
