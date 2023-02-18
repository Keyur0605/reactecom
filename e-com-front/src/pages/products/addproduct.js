import React, { useState } from "react";
import { Grid, Paper, Avatar } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { useForm, Controller } from "react-hook-form";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  field: {
    marginTop: 15,
    marginBottom: 15,
    display: "block",
  },
});

export default function AddProduct() {
  const classes = useStyles();
  const [preview, setPreview] = useState([]);

  const fileobj = [];

  const paperStyle = { padding: "30px 20px", width: 600, margin: "30px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Add Product</h2>
        </Grid>
        <form>
          <Controller
            name="image"
            className={classes.field}
            control={control}
            defaultValue=""
            render={({ fieldState: { error } }) => (
              <input
                style={{ marginTop: 15, marginBottom: 15, display: "block" }}
                className={classes.field}
                fullWidth
                name="image"
                multiple
                onChange={(e) => {
                  console.log("before preview", preview);
                  setPreview([]);

                  let files = e.target.files;
                  fileobj.push(files);
                  let reader;

                  for (var i = 0; i < fileobj[0].length; i++) {
                    console.log(fileobj[0][i], "fileobj[0][i]");
                    reader = new FileReader();
                    reader.readAsDataURL(fileobj[0][i]);
                    console.log(reader, "dkgjhg");
                    reader.onload = (e) => {
                      console.log(e, "fdlb");
                      preview.push(e.target.result);

                      setPreview([...preview]);
                    };
                  }
                  console.log("after preview", preview);
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
        </form>
      </Paper>
    </Grid>
  );
}
