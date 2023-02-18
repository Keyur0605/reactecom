import React, { useState, useEffect } from "react";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
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

export default function UpdateProduct() {
  let history = useHistory();

  const [mydata, setMyData] = useState([]);
  const [files, setFiles] = useState(
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
  );
  const [dataValues, setdataValues] = useState([]);
  const [preview, setPreview] = useState([]);
  const fileobj = [];
  const serverBaseURI = "http://localhost:8000";
  const nums = [1, 2, 3, 4];
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/category", {
        headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
      })
      .then((response) => {
        setdataValues(response.data.data);
        console.log("rss", response.data.data);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/product/" + id)
        .then((response) => {
          console.log("res", response.data.data);
          setMyData(response.data.data);
          setValue("price", response.data.data.price);
          setValue("category", response.data.data.category);
          setValue("description", response.data.data.description);
          setValue("image", response.data.data.image);
          setValue("title", response.data.data.title);
          setValue("content", response.data.data.content);
          setValue("quantity", response.data.data.quantity);
          console.log("ress", response.data.data.image);

          setPreview([
            `${serverBaseURI}/${response.data.data.image[0]}`,
            `${serverBaseURI}/${response.data.data.image[1]}`,
            `${serverBaseURI}/${response.data.data.image[2]}`,
          ]);

          console.log("my", mydata);
        });
    };

    fetchData();
  }, []);

  // console.log("nm", mydata.name);

  const classes = useStyles();
  const paperStyle = { padding: "30px 20px", width: 600, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 10 };

  const {
    setValue,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("id_token");

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    axios
      .post(
        "http://localhost:8000/product_update/" + id,

        formData,

        {
          headers: { Authorization: `Basic ${token}` },
        },
      )
      .then((response) => {
        history.push("/app/products");
        toast.success("Prodcut Updated");
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
          <h2 style={headerStyle}>Update Product</h2>
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
            className={classes.field}
            control={control}
            defaultValue=""
            render={({ field: { onChange }, fieldState: { error } }) => (
              <input
                style={{ marginTop: 15, marginBottom: 15, display: "block" }}
                className={classes.field}
                fullWidth
                name="image"
                multiple
                onChange={(e) => {
                  onChange(e.target.files);
                  let files = e.target.files;
                  fileobj.push(files);
                  let reader;

                  for (var i = 0; i < fileobj[0].length; i++) {
                    reader = new FileReader();
                    reader.readAsDataURL(fileobj[0][i]);
                    reader.onload = (e) => {
                      preview.push(e.target.result); // update the array instead of replacing the entire value of preview

                      setPreview([...preview]); // spread into a new array to trigger rerender
                    };
                  }

                  // fileObj.push(e.target.files);
                  // for (let i = 0; i < fileObj[0].length; i++) {
                  //   fileArray.push(URL.createObjectURL(fileObj[0][i]));
                  // }
                  // setFiles({ files: fileArray });

                  // console.log(e.target.files[0]);
                  // if (e.target.files) {
                  //   let filesAmount = e.target.files.length;
                  //   let i;
                  //   for (i = 0; i < filesAmount; i++) {
                  //     let reader = new FileReader();
                  //     reader.onload = function (ev) {
                  //       setFiles(ev.target.result);
                  //       // setMyFIle(ev.target.result);
                  //       // setMyFl(ev.target.result);
                  //       console.log(ev.target.result);
                  //     };
                  //     reader.readAsDataURL(e.target.files[i]);
                  //   }
                  // }
                  // let files = Array.from(e.target.files);

                  // files.forEach((file) => {
                  //   let reader = new FileReader();
                  //   reader.onloadend = () => {
                  //     setImagesUrls([...imagesPreviewUrls, reader.result]);
                  //   };
                  //   // myArr.push(file);
                  //   // console.log(myArr);
                  //   reader.readAsDataURL(file);
                  // });

                  // setFiles(e.target.files[0]);
                  // setMyFIle(e.target.files[1]);
                  // setMyFl(e.target.files[2]);
                  // const reader = new FileReader();
                  // reader.addEventListener("load", () => {
                  //   setFiles(reader.result);
                  //   // setMyFIle(reader.result);
                  //   // setMyFl(reader.result);
                  // });
                  // reader.readAsDataURL(e.target.files[0]);
                  // reader.readAsDataURL(e.target.files[1]);
                  // reader.readAsDataURL(e.target.files[2]);
                }}
                error={!!error}
                helperText={error ? error.message : null}
                type="file"
              />
            )}
            rules={{ required: "Image required" }}
          />

          {(preview || []).map((url, index) => (
            <img
              src={url}
              key={index}
              style={{ marginLeft: "10px" }}
              id="img"
              width={90}
              height={90}
            />
          ))}
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
            name="category"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                select
                className={classes.field}
                label="Category"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter Category"
                helperText={error ? error.message : null}
              >
                {dataValues.map((tags, index) => (
                  <MenuItem key={index} value={tags.title}>
                    {tags.title}
                  </MenuItem>
                ))}
                {/* <MenuItem key={"jani"} value={"jani"}>
                  {"jani"}
                </MenuItem> */}
              </TextField>
            )}
          />
          {/* <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Category"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your category"
                helperText={error ? error.message : null}
              />
            )}
          /> */}
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Price"
                value={value}
                fullWidth
                onChange={onChange}
                error={!!error}
                placeholder="Enter your Username"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.field}
                label="Quantity"
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
              Update Product
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
