import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  field: {
    marginTop: 15,
    marginBottom: 15,
    display: "block",
  },
});

export default function AddUser() {
  const classes = useStyles();
  let history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 600, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 10 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(
        "http://localhost:8000/adduser",
        {
          email: data.email,
          name: data.username,
          phoneno: data.phoneno,
          password: data.password,
        },
        // {
        //   headers: { Authorization: `Basic ${token}` },
        // }
      )
      .then((response) => {
        history.push("users");
        toast.success("User Added");

        console.log(response);
        console.log("datas", response.data);
      });
  };

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <ToastContainer />
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Add User</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.field}
            fullWidth
            label="Name"
            name="username"
            placeholder="Enter your name"
            {...register("username", { required: true, maxLength: 20 })}
          />
          {errors.username && errors.username.type === "required" && (
            <span style={{ color: "red" }} role="alert">
              UserName is required
            </span>
          )}

          <TextField
            className={classes.field}
            fullWidth
            label="Email"
            name="email"
            placeholder="Enter your email"
            {...register("email", { required: true, maxLength: 20 })}
          />
          {errors.email && errors.email.type === "required" && (
            <span style={{ color: "red" }} role="alert">
              Email is required
            </span>
          )}

          <TextField
            className={classes.field}
            fullWidth
            label="Phone Number"
            name="phoneno"
            placeholder="Enter your phone number"
            {...register("phoneno", {
              required: true,
            })}
          />
          {errors.phoneno && errors.phoneno.type === "required" && (
            <span style={{ color: "red" }} role="alert">
              Phoneno is required
            </span>
          )}

          <TextField
            className={classes.field}
            fullWidth
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, maxLength: 20 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span style={{ color: "red" }} role="alert">
              Password is required
            </span>
          )}

          <Box display="flex" justifyContent="center">
            <Button
              style={marginTop}
              type="submit"
              variant="contained"
              color="primary"
            >
              Add User
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
