import React, { useState, useEffect } from "react";

import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  field: {
    marginTop: 15,
    marginBottom: 15,
    display: "block",
  },
});

export default function UpdateCat() {
  const [mydata, setMyData] = useState([]);

  const classes = useStyles();
  let history = useHistory();
  const [files, setFiles] = useState(
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
  );
  const serverBaseURI = "http://localhost:8000";

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/category/" + id)
        .then((response) => {
          setMyData(response.data.data);

          setValue("image", response.data.data.image);
          setValue("title", response.data.data.title);

          setFiles(`${serverBaseURI}/${response.data.data.image}`);
          console.log("my", mydata);
        });
    };

    fetchData();
  }, []);

  const paperStyle = { padding: "30px 20px", width: 500, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 10 };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("id_token");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);

    axios
      .post(
        "http://localhost:8000/category_update/" + id,

        formData,

        {
          headers: { Authorization: `Basic ${token}` },
        },
      )
      .then((response) => {
        history.push("/app/categorys");
        toast.success("Category Added");
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
          <h2 style={headerStyle}>Update Category</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Title"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your title"
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Title required" }}
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
                  // console.log(e.target.files[0]);

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
            rules={{ required: "Image required" }}
          />

          <img src={files} id="img" width={90} height={90}></img>

          <Box display="flex" justifyContent="center">
            <Button
              style={marginTop}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Category
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
