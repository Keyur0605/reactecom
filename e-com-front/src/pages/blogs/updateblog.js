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

export default function UpdateBlog() {
  const [mydata, setMyData] = useState([]);
  const [files, setFiles] = useState(
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
  );
  let history = useHistory();
  const serverBaseURI = "http://localhost:8000";
  const token = localStorage.getItem("id_token");

  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:8000/blog/" + id).then((response) => {
        setMyData(response.data.data);
        setValue("username", response.data.data.username);
        setValue("description", response.data.data.description);
        setValue("image", response.data.data.image);
        setValue("title", response.data.data.title);
        setValue("content", response.data.data.content);
        setFiles(`${serverBaseURI}/${response.data.data.image}`);
        console.log("my", mydata);
      });
    };

    fetchData();
  }, []);

  const classes = useStyles();
  const paperStyle = { padding: "30px 20px", width: 600, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 10 };

  console.log("names", mydata);
  const {
    setValue,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("description", data.description);
    formData.append("username", data.username);
    formData.append("content", data.content);
    axios
      .post(
        "http://localhost:8000/blog_update/" + id,

        formData,

        {
          headers: { Authorization: `Basic ${token}` },
        },
      )
      .then((response) => {
        history.push("/app/blogs");
        toast.success("Blog Added");
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
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Name"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Name"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            defaultValue=""
            render={({ field: { onChange }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                fullWidth
                onChange={(e) => {
                  onChange(e.target.files[0]);

                  setFiles(e.target.files[0]);
                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    setFiles(reader.result);
                  });
                  reader.readAsDataURL(e.target.files[0]);
                }}
                error={!!error}
                helperText={error ? error.message : null}
                type="file"
              />
            )}
          />
          <img src={files} id="img" width={80} height={80}></img>

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Description"
                multiline
                rows={3}
                rowsMax={5}
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your description"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Content"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Content"
                helperText={error ? error.message : null}
              />
            )}
          />
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
          />

          <Box display="flex" justifyContent="center">
            <Button
              style={marginTop}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Blog
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
