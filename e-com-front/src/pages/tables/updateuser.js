import React, { useState, useEffect } from "react";

import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
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

export default function UpdateUser() {
  let history = useHistory();
  const [mydata, setMyData] = useState([]);
  const classes = useStyles();

  const paperStyle = { padding: "30px 20px", width: 600, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 10 };

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:8000/user/" + id).then((response) => {
        setMyData(response.data.data);
        setValue("username", response.data.data.name);
        setValue("phoneno", response.data.data.phoneno);
        setValue("email", response.data.data.email);
        console.log("my", mydata);
      });
    };

    fetchData();
  }, []);

  console.log("nm", mydata.name);

  console.log("names", mydata);
  const {
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    console.log("mydata", mydata);
    axios
      .post(
        "http://localhost:8000/user_update/" + id,
        {
          name: data.username,
          phoneno: data.phoneno,
          email: data.email,
          password: mydata.password,
        },
        // {
        //   headers: { Authorization: `Basic ${token}` },
        // }
      )
      .then((response) => {
        history.push("/app/users");
        toast.success("User Updated");
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
          <h2 style={headerStyle}>Update User</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Username"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Username"
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Name required" }}
          />
          <Controller
            name="phoneno"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Phoneno"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Phone"
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Phone required" }}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Email"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Email"
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Email required" }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              style={marginTop}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update User
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
