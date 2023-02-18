import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { deleteCat, deleteAllCat } from "../../Services/ApiService";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => {
  return {
    large: {
      height: `54px !important`,
      width: `54px !important`,
    },
    titleItemRight: {
      transform: "translateY(-40%)",
      align: "right",
    },
  };
});

export default function Categorys() {
  const classes = useStyles();
  let history = useHistory();

  const [dataValues, setdataValues] = useState([]);
  const serverBaseURI = "http://localhost:8000";

  useEffect(() => {
    list();
  }, []);
  const list = () => {
    axios
      .get("http://localhost:8000/category", {
        headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
      })
      .then((response) => {
        setdataValues(response.data.data);
        console.log(response.data);
      });
  };

  const deleteCategory = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        return (
          deleteCat(uid, () => {
            list();
          }),
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success",
          )
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const deleteRows = (RowsDeleted, data) => {
    const ids = RowsDeleted.data.map((d) => d.dataIndex);

    let indexes = [];
    const arr = [];
    for (let i = 0; i < dataValues.length; i++) {
      indexes.push(i);
    }
    const cmn = indexes.filter((element) => {
      if (ids.includes(element)) {
        arr.push(element);
      }
    });
    const usr = [];
    arr.map((index) => {
      var values = dataValues[index];
      usr.push(values._id);
      var data_ids = values._id;
    });
    console.log(usr, "usr");
    const token = localStorage.getItem("id_token");
    deleteAllCat(
      usr,
      token,
      () => {
        list();
        toast.error("Deleted");
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const rows = dataValues.map((user) => {
    return {
      title: user.title,
      image: (
        <div>
          <img
            className={classes.large}
            src={`${serverBaseURI}/${user.image}`}
            alt={user.image}
          />
        </div>
      ),

      action: (
        <div>
          <EditIcon
            onClick={() => history.push("updatecategory/" + user._id)}
          />

          <DeleteIcon onClick={() => deleteCategory(user._id)} />
        </div>
      ),
    };
  });
  const columns = [
    { name: "title", label: "Name" },
    {
      name: "image",
      label: "Image",
    },
    { name: "action", label: "Action" },
  ];

  console.log("mydatasss", dataValues);
  console.log("Basic " + localStorage.getItem("id_token"));
  return (
    <>
      <PageTitle title="Categorys" />
      <ToastContainer />

      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Button
            className={classes.titleItemRight}
            variant="contained"
            color="primary"
            onClick={() => history.push("/app/addcategory")}
          >
            Add New
          </Button>
          <MUIDataTable
            title="Category"
            data={rows}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: deleteRows,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
