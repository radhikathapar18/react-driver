import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Team from "../team";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userDetails, setUserDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);

  const handleFormSubmit = (values) => {
    const newUserDetail = { ...values, id: uuid() };
    setUserDetails((prevUserDetails) => [...prevUserDetails, newUserDetail]);
    setOpen(false);
    updateTeamData(newUserDetail);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    handleFormSubmit(values);
  };

  const updateTeamData = (newUserDetail) => {
    setTeamData((prevData) => [...prevData, newUserDetail]);
  };

  return (
    <Box m="20px">
      <Header title="Team" subtitle="Add Team Member" />

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          float: isNonMobile ? "right" : "none",
          mb: isNonMobile ? 0 : 2,
          mt: 2,
        }}
      >
        Add Member
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Team</DialogTitle>
        <DialogContent>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name="age"
                  error={!!touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Team userDetails={userDetails} updateTeamData={updateTeamData} />
    </Box>
  );
};

const initialValues = {
  name: "",
  age: "",
  email: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default Form;
